import { motion } from 'framer-motion';
import { Download, RefreshCw, FileCheck, CheckCircle2 } from 'lucide-react';

interface ConvertedVideo {
  url: string;
  name: string;
  blob: Blob;
}

interface VideoResultProps {
  results: ConvertedVideo[];
  onReset: () => void;
}

export const VideoResult = ({ 
  results, 
  onReset 
}: VideoResultProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Arquivos Convertidos</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={onReset} className="action-btn" title="Converter novos" style={{ width: 'auto', padding: '0 1.5rem', gap: '0.5rem' }}>
            <RefreshCw size={18} />
            <span>Novo Lote</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        {results.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card"
            style={{ padding: '1.25rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', textAlign: 'left' }}>
              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                padding: '1rem',
                borderRadius: '12px',
                color: '#22c55e'
              }}>
                <FileCheck size={24} />
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', margin: 0 }}>{video.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>MOV pronto para uso</p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a href={video.url} download={video.name} className="action-btn" title="Baixar">
                  <Download size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {results.length > 1 && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>
          <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '0.5rem', color: '#22c55e' }} />
          Todos os {results.length} arquivos processados com sucesso.
        </p>
      )}
    </div>
  );
};
