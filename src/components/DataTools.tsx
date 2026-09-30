import { useMemo, useRef, useState } from 'react';
import { IonIcon } from '@ionic/react';
import {
  cloudDownloadOutline,
  cloudUploadOutline,
  refreshOutline,
  trashOutline,
} from 'ionicons/icons';

import { loadActivity } from '../state/activity';
import {
  clearTutorData,
  restoreSnapshot,
  snapshotJson,
  validateSnapshot,
} from '../state/snapshot';
import { patterns } from '../data/patterns';

function activityLabel(kind: string) {
  if (kind === 'lesson_complete') return 'LESSON COMPLETE';
  if (kind === 'recognition_answer') return 'RECOGNITION';
  return 'CODING';
}

function relativeTime(at: number) {
  const delta = Date.now() - at;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (delta < hour) return `${Math.max(1, Math.floor(delta / minute))}m ago`;
  if (delta < day) return `${Math.floor(delta / hour)}h ago`;
  return `${Math.floor(delta / day)}d ago`;
}

export function LearningHistory() {
  const activity = useMemo(() => loadActivity().slice(0, 12), []);

  if (!activity.length) {
    return (
      <section className="history-panel empty">
        <span className="eyebrow">RECENT ACTIVITY</span>
        <h3>Your learning history starts here.</h3>
        <p>Complete a lesson, answer a recognition challenge, or run a coding problem.</p>
      </section>
    );
  }

  return (
    <section className="history-panel">
      <div className="history-head">
        <div>
          <span className="eyebrow">RECENT ACTIVITY</span>
          <h3>Evidence trail</h3>
        </div>
        <span>{activity.length} recent events</span>
      </div>

      <div className="history-list">
        {activity.map((event) => {
          const pattern = patterns.find((item) => item.id === event.patternId);
          return (
            <div className="history-row" key={event.id}>
              <span className={'history-dot ' + (event.success === false ? 'failed' : 'success')} />
              <div>
                <strong>{pattern?.title ?? event.problemId ?? 'Learning activity'}</strong>
                <small>{activityLabel(event.kind)} · {event.success === false ? 'needs review' : 'completed'}</small>
              </div>
              <em>{relativeTime(event.at)}</em>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function DataPortability() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  const exportData = () => {
    const blob = new Blob([snapshotJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `dsa-tutor-backup-${new Date().toISOString().slice(0,10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage('Backup exported.');
  };

  const importData = async (file?: File) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!validateSnapshot(parsed)) {
        setMessage('This file is not a supported DSA Tutor backup.');
        return;
      }
      restoreSnapshot(parsed);
      setMessage('Backup restored. Reloading…');
      window.setTimeout(() => window.location.reload(), 450);
    } catch {
      setMessage('Could not read that backup file.');
    }
  };

  const clearData = () => {
    if (!window.confirm('Clear all DSA Tutor progress, practice, coding stats and drafts on this device?')) return;
    clearTutorData();
    setMessage('Local learning data cleared. Reloading…');
    window.setTimeout(() => window.location.reload(), 450);
  };

  return (
    <section className="data-panel">
      <div className="data-copy">
        <span className="eyebrow">DATA & SYNC FOUNDATION</span>
        <h3>Own your learning state.</h3>
        <p>
          Export a portable JSON backup containing progress, mastery evidence, review schedule,
          coding stats, activity history and code drafts. Importing restores the same state on another device.
        </p>
      </div>

      <div className="data-actions">
        <button onClick={exportData}><IonIcon icon={cloudDownloadOutline} /> EXPORT BACKUP</button>
        <button onClick={() => inputRef.current?.click()}><IonIcon icon={cloudUploadOutline} /> IMPORT BACKUP</button>
        <button className="danger" onClick={clearData}><IonIcon icon={trashOutline} /> CLEAR LOCAL DATA</button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(event) => {
            void importData(event.target.files?.[0]);
            event.currentTarget.value = '';
          }}
        />
      </div>

      <div className="sync-roadmap">
        <IonIcon icon={refreshOutline} />
        <div>
          <strong>Cloud-ready snapshot format</strong>
          <small>The same versioned payload can be stored in Supabase once account sync is enabled.</small>
        </div>
      </div>

      {message && <p className="data-message">{message}</p>}
    </section>
  );
}
