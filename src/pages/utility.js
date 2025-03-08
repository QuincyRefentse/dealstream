// utility.js
export const drawRect = (detections, ctx) => {
  if (!detections || detections.length === 0 || !ctx) return;

  // Color palette for different classes
  const classColors = {
    person: '#FF0000',    // Red
    cellphone: '#00FF00', // Green
    laptop: '#0000FF',    // Blue
    book: '#FFA500',      // Orange
    default: '#00FF00'    // Green (fallback)
  };

  detections.forEach((prediction) => {
    const [x, y, width, height] = prediction.bbox;
    const text = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;
    
    // Get color based on class
    const color = classColors[prediction.class] || classColors.default;
    
    // Set styles
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;
    ctx.font = '18px Arial';
    
    // Calculate text dimensions
    const textWidth = ctx.measureText(text).width;
    const textHeight = parseInt(ctx.font, 10);
    
    // Draw bounding box
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.stroke();
    
    // Draw text background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(
      x - 1,
      y - textHeight - 2,
      textWidth + 4,
      textHeight + 4
    );
    
    // Draw text
    ctx.fillStyle = color;
    ctx.fillText(text, x + 2, y - 5);
  });
};

// Helper function to check camera support
export const checkCameraSupport = async () => {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Camera API not supported in this browser');
    }
    
    const devices = await navigator.mediaDevices.enumerateDevices();
    const hasCamera = devices.some(device => device.kind === 'videoinput');
    
    if (!hasCamera) {
      throw new Error('No camera device found');
    }
    
    return true;
  } catch (error) {
    console.error('Camera check failed:', error);
    return false;
  }
};
