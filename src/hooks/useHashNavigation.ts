import { useEffect, useState } from 'react';

import { patterns } from '../data/patterns';
import type { Page, PatternId } from '../types/lesson';

export type RouteState = {
  page: Page;
  patternId?: PatternId;
};

const knownPatternIds = new Set<PatternId>(patterns.map((pattern) => pattern.id));

export function parseHash(hash: string): RouteState {
  const path = hash.replace(/^#\/?/, '').split('/').filter(Boolean);

  if (path[0] === 'lesson') {
    const candidate = path[1] as PatternId | undefined;
    if (candidate && knownPatternIds.has(candidate)) {
      return { page: 'lesson', patternId: candidate };
    }
    return { page: 'learn' };
  }

  if (path[0] === 'learn') return { page: 'learn' };
  if (path[0] === 'practice') return { page: 'practice' };
  if (path[0] === 'code') return { page: 'code' };
  if (path[0] === 'progress') return { page: 'progress' };
  return { page: 'home' };
}

export function hashFor(page: Page, patternId?: PatternId) {
  if (page === 'home') return '#/';
  if (page === 'lesson' && patternId) return `#/lesson/${patternId}`;
  return `#/${page}`;
}

export function useHashNavigation() {
  const [route, setRoute] = useState<RouteState>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (page: Page, patternId?: PatternId) => {
    const nextHash = hashFor(page, patternId);
    if (window.location.hash === nextHash) {
      setRoute(parseHash(nextHash));
      return;
    }
    window.location.hash = nextHash;
  };

  return { ...route, navigate };
}
