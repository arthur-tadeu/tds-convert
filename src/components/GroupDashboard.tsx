import { useState, useEffect } from 'react';
import { Users, HardDrive } from 'lucide-react';
import type { Group } from '../constants/groups';
import { useFirebase, ConvertedVideo } from '../hooks/useFirebase';

interface GroupDashboardProps {
  groups: Group[];
}

export const GroupDashboard = ({ groups }: GroupDashboardProps) => {
  const { subscribeToVideos } = useFirebase();
  const [groupVideos, setGroupVideos] = useState<Record<number, ConvertedVideo[]>>({});

  useEffect(() => {
    const unsubscribers = groups.map(group => {
      return subscribeToVideos(group.id, (videos) => {
        setGroupVideos(prev => ({ ...prev, [group.id]: videos }));
      });
    });

    return () => unsubscribers.forEach(unsub => unsub());
  }, [groups]);

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Users style={{ color: 'var(--accent-cyan)' }} />
        <h2 style={{ margin: 0, fontSize: '1.8rem' }}>Dashboard de Grupos</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {groups.map(group => (
          <div key={group.id} className="glass-card" style={{ padding: '1.5rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--accent-cyan)' }}>{group.name}</h3>
              <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                {groupVideos[group.id]?.length || 0} arquivos
              </span>
            </div>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', minHeight: '3em' }}>
              Integrantes: {group.members.join(', ')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {groupVideos[group.id]?.slice(0, 5).map(video => (
                <a 
                  key={video.id} 
                  href={video.url} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    fontSize: '0.85rem', 
                    color: 'var(--text-main)',
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,0.02)',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
                >
                  <HardDrive size={14} style={{ color: 'var(--accent-purple)' }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{video.name}</span>
                </a>
              ))}
              {(!groupVideos[group.id] || groupVideos[group.id].length === 0) && (
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.2)', textAlign: 'center', padding: '1rem 0' }}>
                  Nenhum arquivo enviado
                </p>
              )}
              {groupVideos[group.id]?.length > 5 && (
                <p style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', textAlign: 'center', margin: 0 }}>
                  + {groupVideos[group.id].length - 5} mais arquivos
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
