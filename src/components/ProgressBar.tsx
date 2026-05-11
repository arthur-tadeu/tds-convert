import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  status: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, status }) => {
  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '2rem auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.75rem',
        fontSize: '0.875rem'
      }}>
        <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{status}</span>
        <span style={{ color: 'var(--accent-cyan)' }}>{progress}%</span>
      </div>
      
      <div style={{
        height: '8px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '999px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          style={{
            height: '100%',
            background: 'linear-gradient(to right, var(--accent-cyan), var(--accent-purple))',
            borderRadius: '999px',
            boxShadow: '0 0 15px rgba(0, 242, 255, 0.5)'
          }}
        />
      </div>
    </div>
  );
};
