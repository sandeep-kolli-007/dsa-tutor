import type { Session } from '@supabase/supabase-js';

import { cloudSyncConfigured, supabase } from '../lib/supabase';
import {
  createSnapshot,
  restoreSnapshot,
  type TutorSnapshot,
  validateSnapshot,
} from './snapshot';

const table = 'dsa_tutor_user_state';

export type CloudSyncStatus = {
  configured: boolean;
  session: Session | null;
};

export async function getCloudSyncStatus(): Promise<CloudSyncStatus> {
  if (!supabase) return { configured: cloudSyncConfigured, session: null };
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return { configured: true, session: data.session };
}

export async function sendMagicLink(email: string) {
  if (!supabase) throw new Error('Cloud sync is not configured for this deployment.');

  const redirectTo = window.location.origin + window.location.pathname + '#/progress';
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo },
  });
  if (error) throw error;
}

export async function signOutCloud() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function pushSnapshotToCloud() {
  if (!supabase) throw new Error('Cloud sync is not configured.');
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!authData.user) throw new Error('Sign in before syncing.');

  const snapshot = createSnapshot();
  const { error } = await supabase.from(table).upsert({
    user_id: authData.user.id,
    snapshot,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });

  if (error) throw error;
  return snapshot;
}

export async function pullSnapshotFromCloud(): Promise<TutorSnapshot> {
  if (!supabase) throw new Error('Cloud sync is not configured.');
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!authData.user) throw new Error('Sign in before syncing.');

  const { data, error } = await supabase
    .from(table)
    .select('snapshot')
    .eq('user_id', authData.user.id)
    .maybeSingle();

  if (error) throw error;
  if (!data?.snapshot) throw new Error('No cloud backup exists for this account yet.');
  if (!validateSnapshot(data.snapshot)) throw new Error('Cloud backup uses an unsupported snapshot format.');

  restoreSnapshot(data.snapshot);
  return data.snapshot;
}

export function subscribeToAuth(callback: (session: Session | null) => void) {
  if (!supabase) return () => undefined;
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}
