/**
 * Initialize the canvas and context for drawing.
 */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let radius = canvas.height / 2;
ctx.translate(radius, radius); // Move the canvas origin to the center
radius *= 0.90; // Adjust radius size by 90% for better fit

// Constants for hand dimensions
const HOUR_HAND_LENGTH = 0.5;
const MINUTE_HAND_LENGTH = 0.8;
const SECOND_HAND_LENGTH = 0.9;

const HOUR_HAND_WIDTH = 0.07;
const MINUTE_HAND_WIDTH = 0.07;
const SECOND_HAND_WIDTH = 0.02;

/**
 * Redraws the clock every animation frame.
 */
function startClock() {
    requestAnimationFrame(drawClock); // Ensure smoother rendering over setInterval
}

/**
 * Function to draw the entire clock.
 */
function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
    requestAnimationFrame(drawClock); // Call again for smooth animation
}

/**
 * Draws the clock face.
 * @param {CanvasRenderingContext2D} ctx - The 2D drawing context.
 * @param {number} radius - The radius of the clock face.
 */
function drawFace(ctx, radius) {
    let grad;
    
    // Draw the clock's white face
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    // Create a gradient for the clock border
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    
    // Draw the clock center
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

/**
 * Draws the numbers on the clock face.
 * @param {CanvasRenderingContext2D} ctx - The 2D drawing context.
 * @param {number} radius - The radius of the clock face.
 */
function drawNumbers(ctx, radius) {
    const fontSize = radius * 0.15;
    ctx.font = `${fontSize}px Arial`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    for (let num = 1; num <= 12; num++) {
        const ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

/**
 * Draws the current time on the clock.
 * @param {CanvasRenderingContext2D} ctx - The 2D drawing context.
 * @param {number} radius - The radius of the clock face.
 */
function drawTime(ctx, radius) {
    const now = new Date();
    
    let hour = now.getHours() % 12;
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // Calculate angles for hands
    const hourAngle = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    const minuteAngle = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    const secondAngle = (second * Math.PI / 30);

    // Draw hands
    drawHand(ctx, hourAngle, radius * HOUR_HAND_LENGTH, radius * HOUR_HAND_WIDTH);
    drawHand(ctx, minuteAngle, radius * MINUTE_HAND_LENGTH, radius * MINUTE_HAND_WIDTH);
    drawHand(ctx, secondAngle, radius * SECOND_HAND_LENGTH, radius * SECOND_HAND_WIDTH);
}

/**
 * Draws a hand on the clock.
 * @param {CanvasRenderingContext2D} ctx - The 2D drawing context.
 * @param {number} pos - The angle position of the hand.
 * @param {number} length - The length of the hand.
 * @param {number} width - The width of the hand.
 */
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

// Start the clock
startClock();
