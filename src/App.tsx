import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RefreshCw, FileCheck } from 'lucide-react';
import { useFFmpeg } from './hooks/useFFmpeg';
import { DropZone } from './components/DropZone';
import { ProgressBar } from './components/ProgressBar';

function App() {
  const { loaded, progress, load, convert } = useFFmpeg();
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ url: string; name: string } | null>(null);

  useEffect(() => {
    load();
  }, []);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    const converted = await convert(selectedFile);
    setResult(converted);
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <div className="app-container">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>TDS Convert</h1>
        <p className="subtitle">Conversor profissional de MP4 para MOV de alta performance.</p>
      </motion.header>

      <main>
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
                <p style={{ marginTop: '1rem', color: 'var(--accent-purple)', fontSize: '0.875rem' }}>
                  <RefreshCw size={14} className="spin" style={{ marginRight: '0.5rem', display: 'inline' }} />
                  Inicializando motor de vídeo...
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
                status={`Convertendo "${file.name}"...`} 
              />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                O processamento é feito localmente no seu navegador.
              </p>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card success-card"
            >
              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                padding: '2rem',
                borderRadius: '50%',
                color: '#22c55e',
                width: 'fit-content',
                margin: '0 auto 1.5rem'
              }}>
                <FileCheck size={48} />
              </div>

              <h2 style={{ marginBottom: '0.5rem' }}>Conversão Concluída!</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Seu arquivo "{result.name}" está pronto para download.
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={result.url}
                  download={result.name}
                  className="button primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'linear-gradient(to right, var(--accent-cyan), var(--accent-purple))',
                    color: 'white',
                    padding: '0.875rem 2rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    boxShadow: '0 10px 20px -5px rgba(0, 242, 255, 0.4)'
                  }}
                >
                  <Download size={20} /> Baixar Arquivo
                </motion.a>

                <button
                  onClick={handleReset}
                  className="button secondary"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-main)',
                    border: '1px solid var(--glass-border)',
                    padding: '0.875rem 2rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}
                >
                  Converter outro
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer style={{ marginTop: '4rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <p>© 2026 TDS Convert. Processamento 100% Privado & Seguro.</p>
      </footer>

      <style>{`
        .spin {
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .success-card {
          border-color: rgba(34, 197, 94, 0.3) !important;
        }
      `}</style>
    </div>
  );
}

export default App;
