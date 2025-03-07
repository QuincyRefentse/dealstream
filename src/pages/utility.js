export const drawRect = (detections, ctx) => {
    if (detections.length === 0) return; // Prevent drawing if no detections
  
    console.log("Drawing boxes for:", detections); // Debugging log
  
    detections.forEach((prediction) => {
      const [x, y, width, height] = prediction['bbox'];
      const text = prediction['class'];
  
      // Use green for the bounding box border
      const borderColor = 'green';
      const fontColor = 'green'; // Class name label color
  
      // Set stroke style (green border for the bounding box)
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 4; // Make the border a bit thicker for visibility
  
      // Set font for the label text
      ctx.font = '18px Arial';
      ctx.fillStyle = fontColor;
  
      // Draw the label text
      ctx.fillText(text, x, y > 10 ? y - 5 : 10); // Prevent the text from going off-screen if too close to the top of the canvas
  
      // Draw the bounding box rectangle
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.stroke();
    });
  };
  