import React, { useRef, useEffect, useState, useCallback } from 'react';
import '../css/DrawKana.css';
import hiraganaData from '../data/hiragana';
import katakanaData from '../data/katakana';

const DrawKana = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentKana, setCurrentKana] = useState(null);
  const [kanaType, setKanaType] = useState('hiragana');

  // Fonction pour aplatir les données des kanas
  const flattenKanaData = (data) => data.flat().filter(kana => kana.symbol !== '');

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(); // Redessiner la grille après avoir effacé le canvas
  }, []);

  const generateNewKana = useCallback(() => {
    const kanaList = kanaType === 'hiragana' ? flattenKanaData(hiraganaData) : flattenKanaData(katakanaData);
    if (kanaList.length === 0) return;

    const randomKana = kanaList[Math.floor(Math.random() * kanaList.length)];
    setCurrentKana(randomKana);
    clearCanvas(); // Effacer le canvas à chaque nouveau kana
  }, [clearCanvas, kanaType]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const size = Math.min(canvas.parentElement.offsetWidth * 0.9, 400); // Limite la taille max à 400px
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = size / 100; // Largeur des traits proportionnelle à la taille du canvas
    contextRef.current = context;

    drawGrid(); // Dessiner la grille à l'initialisation
    generateNewKana(); // Générer un kana à l'initialisation
  }, [generateNewKana]);

  // Fonction pour dessiner la grille
  const drawGrid = () => {
    const context = contextRef.current;
    const size = canvasRef.current.width;

    context.clearRect(0, 0, size, size); // Effacer le canvas avant de dessiner la grille

    context.strokeStyle = 'lightgray';
    context.lineWidth = 1;
    // Ligne horizontale au milieu
    context.beginPath();
    context.moveTo(0, size / 2);
    context.lineTo(size, size / 2);
    context.stroke();

    // Ligne verticale au milieu
    context.beginPath();
    context.moveTo(size / 2, 0);
    context.lineTo(size / 2, size);
    context.stroke();

    // Réinitialiser la largeur des traits pour le dessin
    context.strokeStyle = 'black';
    context.lineWidth = size / 100; // Largeur des traits ajustée à la taille du canvas
  };

  const startDrawing = (nativeEvent) => {
    nativeEvent.preventDefault(); // Empêche le scrolling sur les événements tactiles
    const { offsetX, offsetY } = adjustCoordinates(nativeEvent);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (nativeEvent) => {
    nativeEvent.preventDefault(); // Empêche le scrolling sur les événements tactiles
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
    const clientX = nativeEvent.touches ? nativeEvent.touches[0].clientX : nativeEvent.clientX;
    const clientY = nativeEvent.touches ? nativeEvent.touches[0].clientY : nativeEvent.clientY;
    return {
      offsetX: (clientX - rect.left) * scaleX,
      offsetY: (clientY - rect.top) * scaleY,
    };
  };

  const validateDrawing = () => {
    drawCorrectKana(); // Dessiner le kana correct en arrière-plan
  };

  // Dessiner le kana correct en arrière-plan (translucide)
  const drawCorrectKana = () => {
    if (!currentKana) return;
    const context = contextRef.current;
    context.save(); // Sauvegarder l'état actuel du contexte
    context.globalAlpha = 0.3; // Transparence pour que le dessin reste visible
    context.font = `${canvasRef.current.width * 0.6}px Arial`; // Taille du kana en fonction du canvas
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(currentKana.symbol, canvasRef.current.width / 2, canvasRef.current.height / 2);
    context.restore(); // Restaurer l'état initial du contexte
  };

  return (
    <div className="draw-kana-container">
      <h1>Dessiner le Kana</h1>

      <div className="kana-selection">
        <label>
          <input
            type="radio"
            name="kanaType"
            value="hiragana"
            checked={kanaType === 'hiragana'}
            onChange={(e) => setKanaType(e.target.value)}
          />
          Hiragana
        </label>
        <label>
          <input
            type="radio"
            name="kanaType"
            value="katakana"
            checked={kanaType === 'katakana'}
            onChange={(e) => setKanaType(e.target.value)}
          />
          Katakana
        </label>
      </div>

      {currentKana && <h2>Dessiner : {currentKana.romaji}</h2>}

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
        onTouchStart={startDrawing}
        onTouchEnd={finishDrawing}
        onTouchMove={draw}
        className="draw-canvas"
      />

      <div className="controls">
        <button onClick={clearCanvas} className="clear-button">Effacer</button>
        <button onClick={validateDrawing} className="validate-button">Valider</button>
        <button onClick={generateNewKana} className="new-kana-button">Nouveau Kana</button>
      </div>
    </div>
  );
};

export default DrawKana;
