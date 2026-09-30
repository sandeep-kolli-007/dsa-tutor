import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { IonIcon } from '@ionic/react';
import {
  cloudDoneOutline,
  cloudOfflineOutline,
  logOutOutline,
  mailOutline,
  refreshOutline,
} from 'ionicons/icons';

import {
  getCloudSyncStatus,
  pullSnapshotFromCloud,
  pushSnapshotToCloud,
  sendMagicLink,
  signOutCloud,
  subscribeToAuth,
} from '../state/cloudSync';

export function CloudSyncPanel() {
  const [configured, setConfigured] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void getCloudSyncStatus()
      .then((status) => {
        setConfigured(status.configured);
        setSession(status.session);
      })
      .catch((error) => setMessage(error instanceof Error ? error.message : String(error)));

    return subscribeToAuth(setSession);
  }, []);

  const action = async (task: () => Promise<unknown>, success: string, reload = false) => {
    if (busy) return;
    setBusy(true);
    setMessage(null);
    try {
      await task();
      setMessage(success);
      if (reload) window.setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  };

  if (!configured) {
    return (
      <section className="cloud-panel disabled">
        <div className="cloud-panel-icon"><IonIcon icon={cloudOfflineOutline} /></div>
        <div>
          <span className="eyebrow">OPTIONAL CLOUD SYNC</span>
          <h3>Backend hooks are ready.</h3>
          <p>
            This deployment is running local-first. Add the Supabase environment variables and apply
            <code> supabase/schema.sql </code> to enable passwordless account sync.
          </p>
        </div>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="cloud-panel">
        <div className="cloud-panel-title">
          <div>
            <span className="eyebrow">CLOUD SYNC</span>
            <h3>Continue on another device.</h3>
          </div>
          <IonIcon icon={cloudDoneOutline} />
        </div>
        <p className="cloud-copy">
          Sign in with an email magic link. Your learning snapshot stays private under row-level security.
        </p>
        <div className="cloud-signin">
          <label>
            <span>EMAIL</span>
            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <button
            disabled={!email.trim() || busy}
            onClick={() => void action(
              () => sendMagicLink(email.trim()),
              'Magic link sent. Open it on this device to finish signing in.'
            )}
          >
            <IonIcon icon={mailOutline} /> SEND MAGIC LINK
          </button>
        </div>
        {message && <p className="cloud-message">{message}</p>}
      </section>
    );
  }

  return (
    <section className="cloud-panel">
      <div className="cloud-panel-title">
        <div>
          <span className="eyebrow">CLOUD SYNC</span>
          <h3>Signed in.</h3>
          <p className="cloud-account">{session.user.email}</p>
        </div>
        <IonIcon icon={cloudDoneOutline} />
      </div>

      <div className="cloud-actions">
        <button
          disabled={busy}
          onClick={() => void action(pushSnapshotToCloud, 'Current device state saved to the cloud.')}
        >
          <IonIcon icon={refreshOutline} /> SAVE THIS DEVICE
        </button>
        <button
          disabled={busy}
          onClick={() => void action(pullSnapshotFromCloud, 'Cloud state restored. Reloading…', true)}
        >
          <IonIcon icon={cloudDoneOutline} /> RESTORE FROM CLOUD
        </button>
        <button
          className="secondary"
          disabled={busy}
          onClick={() => void action(signOutCloud, 'Signed out.')}
        >
          <IonIcon icon={logOutOutline} /> SIGN OUT
        </button>
      </div>

      <p className="cloud-warning">
        Cloud restore intentionally replaces local progress with the selected account snapshot. Export a JSON
        backup first if you want a manual recovery point.
      </p>
      {message && <p className="cloud-message">{message}</p>}
    </section>
  );
}
