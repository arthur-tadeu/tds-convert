import { motion } from 'framer-motion';
import { Download, RefreshCw, FileCheck, CheckCircle2 } from 'lucide-react';
import type { Group } from '../constants/groups';

interface VideoResultProps {
  result: { url: string; name: string; blob: Blob };
  saveStatus: 'idle' | 'saving' | 'saved';
  groups: Group[];
  selectedGroupId: number | null;
  onSave: (groupId: number) => void;
  onReset: () => void;
}

export const VideoResult = ({ 
  result, 
  saveStatus, 
  groups, 
  selectedGroupId, 
  onSave, 
  onReset 
}: VideoResultProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{ borderColor: saveStatus === 'saved' ? '#22c55e' : 'var(--glass-border)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', textAlign: 'left' }}>
        <div style={{
          background: saveStatus === 'saved' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(0, 242, 255, 0.1)',
          padding: '1.5rem',
          borderRadius: '20%',
          color: saveStatus === 'saved' ? '#22c55e' : 'var(--accent-cyan)'
        }}>
          {saveStatus === 'saved' ? <CheckCircle2 size={40} /> : <FileCheck size={40} />}
        </div>
        
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
            {saveStatus === 'saved' ? 'Salvo no Firebase!' : 'Pronto para Exportar'}
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>{result.name}</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href={result.url} download={result.name} className="action-btn">
            <Download size={20} />
          </a>
          <button onClick={onReset} className="action-btn">
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {saveStatus !== 'saved' && (
        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', textAlign: 'left' }}>Selecione o Grupo para Salvar:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            {groups.map(group => (
              <button
                key={group.id}
                disabled={saveStatus === 'saving'}
                onClick={() => onSave(group.id)}
                className={`group-select-btn ${selectedGroupId === group.id ? 'active' : ''}`}
              >
                {group.name}
              </button>
            ))}
          </div>
          {saveStatus === 'saving' && (
            <p style={{ marginTop: '1rem', color: 'var(--accent-cyan)', fontSize: '0.9rem', textAlign: 'left' }}>
              <RefreshCw size={14} className="spin" style={{ marginRight: '0.5rem', display: 'inline' }} />
              Fazendo upload para o banco de dados...
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};
