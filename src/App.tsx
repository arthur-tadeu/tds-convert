import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useFFmpeg } from './hooks/useFFmpeg';
import { useFirebase } from './hooks/useFirebase';
import { DropZone } from './components/DropZone';
import { ProgressBar } from './components/ProgressBar';
import { VideoResult } from './components/VideoResult';
import { GroupDashboard } from './components/GroupDashboard';
import { GROUPS } from './constants/groups';

function App() {
  const { loaded, progress, load, convert } = useFFmpeg();
  const { uploadVideo } = useFirebase();
  
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ url: string; blob: Blob; name: string } | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    load();
  }, []);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    setSaveStatus('idle');
    try {
      const converted = await convert(selectedFile);
      setResult(converted);
    } catch (error) {
      alert("Erro na conversão. Tente outro arquivo.");
      setFile(null);
    }
  };

  const handleSaveToGroup = async (groupId: number) => {
    if (!result) return;
    setSaveStatus('saving');
    try {
      await uploadVideo(result.blob, result.name, groupId);
      setSaveStatus('saved');
    } catch (error) {
      alert("Erro ao salvar no Firebase. Verifique sua conexão e permissões.");
      setSaveStatus('idle');
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setSaveStatus('idle');
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
        <p className="subtitle">Conversor profissional com gestão de grupos integrada ao Firebase.</p>
      </motion.header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
        {/* Converter Section */}
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
                saveStatus={saveStatus}
                groups={GROUPS}
                selectedGroupId={null}
                onSave={handleSaveToGroup}
                onReset={handleReset}
              />
            )}
          </AnimatePresence>
        </section>

        {/* Dashboard Section */}
        <GroupDashboard groups={GROUPS} />
      </main>

      <footer style={{ marginTop: '6rem', color: 'var(--text-muted)', fontSize: '0.875rem', paddingBottom: '2rem' }}>
        <p>© 2026 TDS Convert. Sistema de Gestão de Dados de Alta Performance.</p>
        <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Processamento Local + Persistência Cloud</p>
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
        
        .group-select-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
          padding: 14px;
          border-radius: 14px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .group-select-btn:hover { background: rgba(255,255,255,0.08); color: var(--text-main); border-color: var(--accent-cyan); transform: translateY(-2px); }
        .group-select-btn.active { background: rgba(0,242,255,0.1); border-color: var(--accent-cyan); color: var(--accent-cyan); }
        .group-select-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
      `}</style>
    </div>
  );
}

export default App;
