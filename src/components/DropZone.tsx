import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileVideo, ShieldCheck } from 'lucide-react';

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFileSelect, disabled }) => {
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'video/mp4') {
      onFileSelect(file);
    } else {
      alert('Por favor, selecione apenas arquivos MP4.');
    }
  }, [onFileSelect, disabled]);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`glass-card drop-zone ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      style={{
        cursor: 'pointer',
        borderStyle: 'dashed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
      onClick={() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.mp4';
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) onFileSelect(file);
        };
        input.click();
      }}
    >
      <div className="shimmer" style={{ position: 'absolute', inset: 0, opacity: 0.1 }} />
      
      <div style={{
        background: 'rgba(0, 242, 255, 0.1)',
        padding: '2rem',
        borderRadius: '50%',
        color: 'var(--accent-cyan)'
      }}>
        <Upload size={48} />
      </div>

      <div>
        <h2 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Arraste seu vídeo MP4
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Ou clique para selecionar um arquivo do seu computador
        </p>
      </div>

      <div style={{
        display: 'flex',
        gap: '2rem',
        marginTop: '1rem',
        fontSize: '0.875rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileVideo size={16} /> MP4 → MOV
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={16} /> 100% Local
        </div>
      </div>
    </motion.div>
  );
};
