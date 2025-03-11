export function numTicksForPixels (pixelsAvailable, pixelsPerTick = 70) {
    return Math.floor(Math.abs(pixelsAvailable) / pixelsPerTick);
}

