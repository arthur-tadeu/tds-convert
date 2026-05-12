import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, FileCheck, CheckCircle2, Edit3 } from 'lucide-react';

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
  const [fileNames, setFileNames] = useState<string[]>([]);

  // Initialize file names from results
  useEffect(() => {
    setFileNames(results.map(v => v.name));
  }, [results]);

  const handleNameChange = (index: number, newName: string) => {
    const updatedNames = [...fileNames];
    updatedNames[index] = newName;
    setFileNames(updatedNames);
  };

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
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '4px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  <Edit3 size={14} style={{ color: 'var(--accent-cyan)' }} />
                  <input 
                    type="text" 
                    value={fileNames[index] || ''} 
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--text-main)', 
                      fontSize: '1rem', 
                      width: '100%',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Nome do arquivo"
                  />
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0, paddingLeft: '4px' }}>
                  Formato: .mov
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a 
                  href={video.url} 
                  download={fileNames[index] || video.name} 
                  className="action-btn" 
                  title="Baixar"
                  style={{ background: 'var(--accent-cyan)', color: '#000', borderColor: 'transparent' }}
                >
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
          Todos os {results.length} arquivos prontos para download com nomes personalizados.
        </p>
      )}
    </div>
  );
};
