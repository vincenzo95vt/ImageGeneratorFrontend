import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './MainComponent.css';
import { getUrlImage } from '../../services/services';

const MainComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [style, setStyle] = useState("");
  const [img, setImg] = useState(undefined);

  const handleSubmit = async (e) => {
    setLoading(true);
    setError(undefined);
    
    if (style === "") {
      setError({ styleError: "Por favor, selecciona un estilo" });
      setLoading(false);
      return;
    }

    if (prompt === "") {
      setError({ promptError: "Escribe un prompt antes de generar" });
      setLoading(false);
      return;
    }
    try {
      const image = await getUrlImage({prompt, style});
      setError(undefined);
      setImg(image.url);
    } catch (error){
      setError({promptError: error.error});
    }finally{
      setLoading(false);
    }
  }

  const handleDeleteAll = () => {
    setImg(undefined);
    setPrompt(undefined);
    setStyle(undefined);
    setError(undefined);
  }

  return (
    <div className="chatgpt-layout">
      <div className="header">
        <h2>Image Generator</h2>
      </div>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            className="loader-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
          >
            <span className="loader"></span>
          </motion.div>
        ) : img ? (
          <motion.div
            key="image"
            className="image-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
          >
            <img src={img} alt="Generated" />
          </motion.div>
        ) : (
          <motion.div
            key="message"
            className="messages-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
          >
            <div className="message assistant">
              <p>Escribe lo que te gustaría que generara la IA ✨</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="input-area">
        <textarea
          className="prompt-input"
          rows={2}
          value={prompt}
          placeholder="Ej: Un dragón cyberpunk sobrevolando Nueva York al atardecer"
          onChange={(e) => setPrompt(e.target.value)}
        />
        {error && <p className="error">{error.promptError}</p>}
        <div className="buttons-opts-cnt">
          <div className="prompt-options">
            <label>Estilo visual:</label>
            <select value={style} onChange={(e) => setStyle(e.target.value)}>
              <option value="">Seleccionar</option>
              <option value="realista">Fotorrealista</option>
              <option value="anime">Anime</option>
              <option value="pixel">Pixel Art</option>
            </select>
          </div>
          {error && <p className="error">{error.styleError}</p>}
          <div className="buttons-cnt">
            <button onClick={handleDeleteAll}>Borrar imagen</button>
            <button
              className="send-button"
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Cargando..." : "Enviar"}
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default MainComponent;
