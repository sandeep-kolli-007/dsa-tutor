import { useEffect, useState } from 'react';

import { patterns } from '../data/patterns';
import { codeProblems } from '../data/codeProblems';
import { codeProblems } from '../data/codeProblems';
import type { Page, PatternId } from '../types/lesson';

export type RouteState = {
  page: Page;
  patternId?: PatternId;
  codeProblemId?: string;
};

const knownPatternIds = new Set<PatternId>(patterns.map((pattern) => pattern.id));
const knownCodeProblemIds = new Set(codeProblems.map((problem) => problem.id));
const knownCodeProblemIds = new Set(codeProblems.map((problem) => problem.id));

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
  if (path[0] === 'code') {
    const candidate = path[1];
    if (candidate && knownCodeProblemIds.has(candidate)) {
      return { page: 'code', codeProblemId: candidate };
    }
    return { page: 'code' };
  }
  if (path[0] === 'progress') return { page: 'progress' };
  return { page: 'home' };
}

export function hashFor(page: Page, resourceId?: string) {
  if (page === 'home') return '#/';
  if (page === 'lesson' && resourceId) return `#/lesson/${resourceId}`;
  if (page === 'code' && resourceId) return `#/code/${resourceId}`;
  return `#/${page}`;
}

export function useHashNavigation() {
  const [route, setRoute] = useState<RouteState>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (page: Page, resourceId?: string) => {
    const nextHash = hashFor(page, resourceId);
    if (window.location.hash === nextHash) {
      setRoute(parseHash(nextHash));
      return;
    }
    window.location.hash = nextHash;
  };

  return { ...route, navigate };
}
