# Analogue Clock
_A simple JavaScript-based analogue clock. This project draws an analogue clock using HTML5 Canvas and JavaScript. The clock face, numbers, and hands update in real time, with smooth animations thanks to modern JavaScript techniques._

## Functionalities
- Clock Rendering: Draws the clock face, numbers, and the clock hands (hour, minute, and second) using the HTML5 Canvas API.
- Real-Time Updates: Updates the clock hands every second in sync with the system’s time using requestAnimationFrame for smooth animation.
- Responsive Layout: The clock is centered on the screen using modern CSS (flexbox), and the canvas is dynamically resized.

## Description
_The project demonstrates how to create a functional analogue clock using JavaScript and the Canvas API. The clock continuously updates based on the system's current time and renders three hands: the hour, minute, and second hands. `requestAnimationFrame()` is used to ensure that the clock updates smoothly in sync with the browser’s rendering, optimizing performance compared to traditional methods like `setInterval()`._

## Key Concepts:

- Canvas API: Used for drawing the clock face and hands.
- JavaScript Timing: Time is managed using the Date object to calculate angles for the clock hands.
- Animation: `requestAnimationFrame()` provides smooth, efficient animations, improving upon the more commonly used `setInterval()`.

## Edge Cases & Assumptions:

- The canvas size is fixed at 600x600 pixels for this example. If adapting for a different screen size or aspect ratio, further modifications would be required.
- The clock assumes a 12-hour format, and no additional timezone or daylight-saving logic is included.

## Prerequisites
No additional libraries are required as the project uses native JavaScript and HTML5.

## Installing Instructions
1. Clone the repository:
    ```bash
    git clone https://github.com/king04aman/All-In-One-Javascript-Projects.git
    ```
2. Navigate to the project directory:
    ```bash
    cd All-In-One-Javascript-Projects/Analogue-Clock
    ```
3. Open index.html in your preferred web browser to run the clock.


## Author
Aman Kumar (@[king04aman](https://github.com/king04aman))
