import { motion } from 'framer-motion';
import { Download, RefreshCw, FileCheck } from 'lucide-react';

interface VideoResultProps {
  result: { url: string; name: string; blob: Blob };
  onReset: () => void;
}

export const VideoResult = ({ 
  result, 
  onReset 
}: VideoResultProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', textAlign: 'left' }}>
        <div style={{
          background: 'rgba(0, 242, 255, 0.1)',
          padding: '1.5rem',
          borderRadius: '20%',
          color: 'var(--accent-cyan)'
        }}>
          <FileCheck size={40} />
        </div>
        
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Pronto para Baixar</h2>
          <p style={{ color: 'var(--text-muted)' }}>{result.name}</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href={result.url} download={result.name} className="action-btn" title="Baixar Vídeo">
            <Download size={20} />
          </a>
          <button onClick={onReset} className="action-btn" title="Converter outro">
            <RefreshCw size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
