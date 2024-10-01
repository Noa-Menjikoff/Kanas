import React, { useRef, useEffect, useState } from 'react';
import '../css/DrawKana.css';
import hiraganaData from '../data/hiragana'; // Importer les données Hiragana
import katakanaData from '../data/katakana'; // Importer les données Katakana

const DrawKana = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentKana, setCurrentKana] = useState(null); // Stocke le kana actuel
  const [isValidated, setIsValidated] = useState(false); // Gérer l'état de validation
  const [kanaType, setKanaType] = useState('hiragana'); // Par défaut, utiliser Hiragana

  // Fonction pour aplatir les données imbriquées et retirer les kanas vides
  const flattenKanaData = (data) => {
    return data.flat().filter(kana => kana.symbol !== '');
  };

  // Combiner les hiragana ou katakana en fonction du type sélectionné
  const getKanaList = () => {
    if (kanaType === 'hiragana') {
      return flattenKanaData(hiraganaData);
    } else if (kanaType === 'katakana') {
      return flattenKanaData(katakanaData);
    }
    return [];
  };

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

    drawGrid();
    generateNewKana(); // Générer un nouveau kana au chargement
  }, [generateNewKana]);

  const drawGrid = () => {
    const context = contextRef.current;
    const size = 400;

    context.clearRect(0, 0, size, size); // Efface l'ancienne grille
    context.strokeStyle = 'lightgray';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, size / 2);
    context.lineTo(size, size / 2);
    context.stroke();

    context.beginPath();
    context.moveTo(size / 2, 0);
    context.lineTo(size / 2, size);
    context.stroke();

    context.strokeStyle = 'black';
    context.lineWidth = 5;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = adjustCoordinates(nativeEvent);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setIsValidated(false); // Réinitialiser la validation lors d'un nouveau dessin
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
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
  };

  const validateDrawing = () => {
    setIsValidated(true); // Définir que le dessin a été validé
  };

  const generateNewKana = () => {
    const kanaList = getKanaList();
    if (kanaList.length === 0) {
      setCurrentKana(null); // Aucun kana sélectionné si aucune option n'est cochée
      return;
    }
    const randomKana = kanaList[Math.floor(Math.random() * kanaList.length)];
    setCurrentKana(randomKana); // Choisir un nouveau kana aléatoire
    setIsValidated(false); // Réinitialiser la validation lors d'un nouveau kana
    clearCanvas(); // Effacer le dessin précédent
  };

  return (
    <div className="draw-kana-container">
      <h1>Dessiner le Kana</h1>

      {/* Sélection des Hiragana et Katakana avec des radios */}
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

      {/* Afficher le romaji du kana à dessiner */}
      {currentKana && <h2>Dessiner : {currentKana.romaji}</h2>}

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
        className="draw-canvas"
      />

      <div className="controls">
        <button onClick={clearCanvas} className="clear-button">Effacer</button>
        <button onClick={validateDrawing} className="validate-button">Valider</button>
        <button onClick={generateNewKana} className="new-kana-button">Nouveau Kana</button>
      </div>

      {/* Afficher le kana correct après validation */}
      {isValidated && currentKana && (
        <div className="kana-result">
          <h3>Le Kana Correct :</h3>
          <div className="kana-display">{currentKana.symbol}</div>
        </div>
      )}
    </div>
  );
};

export default DrawKana;
