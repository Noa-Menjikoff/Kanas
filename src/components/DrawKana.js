import React, { useRef, useEffect, useState } from 'react';
import './DrawKana.css';

const DrawKana = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const size = 400;
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;

    // Dessiner la grille initiale
    drawGrid();
  }, []);

  const drawGrid = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const size = 400;

    // Ligne horizontale au milieu
    context.strokeStyle = 'lightgray';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, size / 2);
    context.lineTo(size, size / 2);
    context.stroke();

    // Ligne verticale au milieu
    context.beginPath();
    context.moveTo(size / 2, 0);
    context.lineTo(size / 2, size);
    context.stroke();

    // Reset du style pour le dessin de l'utilisateur
    context.strokeStyle = 'black';
    context.lineWidth = 5;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = adjustCoordinates(nativeEvent);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = adjustCoordinates(nativeEvent);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const adjustCoordinates = (nativeEvent) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      offsetX: (nativeEvent.clientX - rect.left) * scaleX,
      offsetY: (nativeEvent.clientY - rect.top) * scaleY,
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    
    // Efface uniquement le contenu du canevas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redessine la grille après l'effacement
    drawGrid();
  };

  return (
    <div className="draw-kana-container">
      <h1>Dessiner un Kana</h1>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
        className="draw-canvas"
      />
      <button onClick={clearCanvas} className="clear-button">Effacer</button>
    </div>
  );
};

export default DrawKana;
