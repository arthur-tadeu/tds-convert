import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useFFmpeg } from './hooks/useFFmpeg';
import { DropZone } from './components/DropZone';
import { ProgressBar } from './components/ProgressBar';
import { VideoResult } from './components/VideoResult';

function App() {
  const { loaded, progress, load, convert } = useFFmpeg();
  
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ url: string; blob: Blob; name: string } | null>(null);

  useEffect(() => {
    load();
  }, []);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    try {
      const converted = await convert(selectedFile);
      setResult(converted);
    } catch (error) {
      alert("Erro na conversão. Tente outro arquivo.");
      setFile(null);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
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
        <p className="subtitle">Conversor profissional de MP4 para MOV de alta performance.</p>
      </motion.header>

      <main>
        <section>
          <AnimatePresence mode="wait">
            {!file && (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <DropZone onFileSelect={handleFileSelect} disabled={!loaded} />
                {!loaded && (
                  <p style={{ marginTop: '1.5rem', color: 'var(--accent-purple)', fontSize: '0.9rem', fontWeight: 500 }}>
                    <RefreshCw size={16} className="spin" style={{ marginRight: '0.75rem', display: 'inline' }} />
                    Inicializando motor de vídeo FFmpeg...
                  </p>
                )}
              </motion.div>
            )}

            {file && !result && (
              <motion.div
                key="converting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card"
              >
                <ProgressBar 
                  progress={progress} 
                  status={`Convertendo "${file.name}" para MOV...`} 
                />
              </motion.div>
            )}

            {result && (
              <VideoResult 
                result={result}
                onReset={handleReset}
              />
            )}
          </AnimatePresence>
        </section>
      </main>

      <footer style={{ marginTop: '6rem', color: 'var(--text-muted)', fontSize: '0.875rem', paddingBottom: '2rem' }}>
        <p>© 2026 TDS Convert. Processamento de vídeo local e privado.</p>
      </footer>

      <style>{`
        .spin { animation: spin 2s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .action-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          color: var(--text-main);
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .action-btn:hover { background: rgba(255,255,255,0.1); border-color: var(--accent-cyan); transform: translateY(-2px); }
      `}</style>
    </div>
  );
}

export default App;
