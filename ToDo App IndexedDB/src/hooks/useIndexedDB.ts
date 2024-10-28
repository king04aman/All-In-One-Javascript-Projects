import { useCallback, useEffect, useState } from "react";

interface UseIndexedDBResult<T> {
  getValue: (tableName: string, id: number) => Promise<T | undefined>;
  getAllValue: (tableName: string) => Promise<T[]>;
  putValue: (tableName: string, value: T) => Promise<IDBValidKey | null>;
  putBulkValue: (tableName: string, values: T[]) => Promise<T[]>;
  updateValue: (params: {
    tableName: string;
    id: number;
    newItem: Partial<T>;
  }) => Promise<void>;
  deleteValue: (tableName: string, id: number) => Promise<number | null>;
  deleteAll: (tableName: string) => Promise<void>;
  isDBConnecting: boolean;
}

interface UseIndexedDBOptions {
  autoIncrement?: boolean;
  keyPath?: string | string[];
}

export const useIndexedDB = <T>(
  databaseName: string,
  tableNames: string[],
  options?: UseIndexedDBOptions
): UseIndexedDBResult<T> => {
  const [db, setDB] = useState<IDBDatabase | null>(null);
  const [isDBConnecting, setIsDBConnecting] = useState<boolean>(true);

  useEffect(() => {
    const initDB = () => {
      const request = indexedDB.open(databaseName);

      // Handle database upgrade
      request.onupgradeneeded = () => {
        const database = request.result;
        tableNames.forEach((tableName) => {
          if (!database.objectStoreNames.contains(tableName)) {
            database.createObjectStore(tableName, {
              autoIncrement: options?.autoIncrement ?? true,
              keyPath: options?.keyPath ?? "id",
            });
          }
        });
      };

      // Handle successful database connection
      request.onsuccess = () => {
        setDB(request.result);
        setIsDBConnecting(false);
      };

      // Handle errors in database connection
      request.onerror = () => {
        console.error("Error initializing IndexedDB:", request.error);
        setIsDBConnecting(false);
      };
    };

    if (!db) {
      initDB();
    }
  }, [databaseName, tableNames, db, options]);

  // Helper function to get a transaction for a specific table
  const getTransaction = (tableName: string, mode: IDBTransactionMode) => {
    if (!db) throw new Error("Database is not initialized");
    return db.transaction(tableName, mode).objectStore(tableName);
  };

  // Function to get a specific value from the table by ID
  const getValue = useCallback(
    async (tableName: string, id: number): Promise<T | undefined> => {
      try {
        const store = getTransaction(tableName, "readonly");
        const request = store.get(id);
        const result = await new Promise<T | undefined>((resolve, reject) => {
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
        return result;
      } catch (error) {
        console.error("Get value failed: ", error);
        return undefined;
      }
    },
    [db]
  );

  // Function to get all values from a specific table
  const getAllValue = async (tableName: string): Promise<T[]> => {
    try {
      const store = getTransaction(tableName, "readonly");
      const request = store.getAll();
      return await new Promise<T[]>((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Get all values failed: ", error);
      return [];
    }
  };

  // Function to insert or update a single value in a specific table
  const putValue = async (
    tableName: string,
    value: T
  ): Promise<IDBValidKey | null> => {
    try {
      const store = getTransaction(tableName, "readwrite");
      const request = store.put(value);
      return await new Promise<IDBValidKey | null>((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Put value failed: ", error);
      return null;
    }
  };

  // Function to insert or update multiple values in a specific table
  const putBulkValue = async (tableName: string, values: T[]): Promise<T[]> => {
    try {
      const store = getTransaction(tableName, "readwrite");
      values.forEach((value) => store.put(value));
      return await getAllValue(tableName);
    } catch (error) {
      console.error("Bulk insert failed: ", error);
      throw error;
    }
  };

  // Function to update a specific value by ID in a specific table
  const updateValue = async ({
    tableName,
    id,
    newItem,
  }: {
    tableName: string;
    id: number;
    newItem: Partial<T>;
  }): Promise<void> => {
    try {
      const store = getTransaction(tableName, "readwrite");
      const request = store.get(id);
      request.onsuccess = async () => {
        const data = request.result;
        if (data) {
          const updatedItem = { ...data, ...newItem };
          await putValue(tableName, updatedItem);
        } else {
          console.warn(`Item with ID ${id} does not exist.`);
        }
      };
    } catch (error) {
      console.error("Update value failed: ", error);
    }
  };

  // Function to delete a specific value by ID from a specific table
  const deleteValue = async (
    tableName: string,
    id: number
  ): Promise<number | null> => {
    try {
      const store = getTransaction(tableName, "readwrite");
      const request = store.delete(id);
      await new Promise<void>((resolve, reject) => {
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
      return id;
    } catch (error) {
      console.error("Delete value failed: ", error);
      return null;
    }
  };

  // Function to delete all values from a specific table
  const deleteAll = async (tableName: string): Promise<void> => {
    try {
      const store = getTransaction(tableName, "readwrite");
      await new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Delete all values failed: ", error);
    }
  };

  // Return the functions to be used in the component
  return {
    getValue,
    getAllValue,
    putValue,
    putBulkValue,
    updateValue,
    deleteValue,
    deleteAll,
    isDBConnecting,
  };
};
