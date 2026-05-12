import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileVideo, ShieldCheck } from 'lucide-react';

interface DropZoneProps {
  onFilesSelect: (files: File[]) => void;
  disabled?: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFilesSelect, disabled }) => {
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(f => f.type === 'video/mp4' || f.name.endsWith('.mp4'));
    
    if (validFiles.length > 0) {
      onFilesSelect(validFiles);
    } else {
      alert('Por favor, arraste apenas arquivos MP4.');
    }
  }, [onFilesSelect, disabled]);

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.mp4';
    input.multiple = true;
    input.onchange = (e) => {
      const selectedFiles = Array.from((e.target as HTMLInputElement).files || []);
      if (selectedFiles.length > 0) {
        onFilesSelect(selectedFiles);
      }
    };
    input.click();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={handleClick}
      className={`glass-card drop-zone ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      style={{
        cursor: 'pointer',
        borderStyle: 'dashed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        padding: '3rem'
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

      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
          Arraste seus vídeos MP4
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Você pode selecionar vários arquivos de uma vez
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
