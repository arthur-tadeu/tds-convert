import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useFFmpeg } from './hooks/useFFmpeg';
import { DropZone } from './components/DropZone';
import { ProgressBar } from './components/ProgressBar';
import { VideoResult } from './components/VideoResult';

interface ConvertedVideo {
  url: string;
  blob: Blob;
  name: string;
}

function App() {
  const { loaded, progress, load, convert } = useFFmpeg();
  
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<ConvertedVideo[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    load();
  }, []);

  const handleFilesSelect = async (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setResults([]);
    setIsProcessing(true);
    setCurrentIndex(0);

    const convertedResults: ConvertedVideo[] = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      setCurrentIndex(i);
      try {
        const result = await convert(selectedFiles[i]);
        convertedResults.push(result);
        // We update results progressively so the user can see them appearing
        setResults([...convertedResults]);
      } catch (error) {
        console.error(`Erro ao converter ${selectedFiles[i].name}:`, error);
      }
    }
    
    setIsProcessing(false);
  };

  const handleReset = () => {
    setFiles([]);
    setResults([]);
    setIsProcessing(false);
    setCurrentIndex(0);
  };

  return (
    <div className="app-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '4rem' }}
      >
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          TDS <span style={{ color: 'var(--accent-cyan)' }}>Convert</span>
        </h1>
        <p className="subtitle">Conversor profissional de MP4 para MOV com suporte a processamento em lote.</p>
      </motion.header>

      <main>
        <section>
          <AnimatePresence mode="wait">
            {files.length === 0 && (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <DropZone onFilesSelect={handleFilesSelect} disabled={!loaded} />
                {!loaded && (
                  <p style={{ marginTop: '1.5rem', color: 'var(--accent-purple)', fontSize: '0.9rem', fontWeight: 500 }}>
                    <RefreshCw size={16} className="spin" style={{ marginRight: '0.75rem', display: 'inline' }} />
                    Inicializando motor de vídeo FFmpeg...
                  </p>
                )}
              </motion.div>
            )}

            {isProcessing && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card"
                style={{ padding: '2.5rem' }}
              >
                <ProgressBar 
                  progress={progress} 
                  status={`Processando ${currentIndex + 1} de ${files.length}: "${files[currentIndex].name}"`} 
                />
                <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {results.length} de {files.length} concluídos
                </p>
              </motion.div>
            )}

            {!isProcessing && results.length > 0 && (
              <VideoResult 
                results={results}
                onReset={handleReset}
              />
            )}
          </AnimatePresence>
        </section>
      </main>

      <footer style={{ marginTop: '6rem', color: 'var(--text-muted)', fontSize: '0.875rem', paddingBottom: '2rem' }}>
        <p>© 2026 TDS Convert. Processamento de vídeo local em lote.</p>
      </footer>

      <style>{`
        .spin { animation: spin 2s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .action-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          color: var(--text-main);
          padding: 0.75rem;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 500;
        }
        .action-btn:hover { background: rgba(255,255,255,0.1); border-color: var(--accent-cyan); transform: translateY(-2px); }
      `}</style>
    </div>
  );
}

export default App;
