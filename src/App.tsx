import { useMemo, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { barChartOutline, codeSlashOutline, flashOutline, homeOutline, schoolOutline } from 'ionicons/icons';

import './roadmap.css';
import './roadmap-mobile.css';
import { patterns } from './data/patterns';
import { loadProgress, saveProgress } from './state/progress';
import type { PatternId } from './types/lesson';
import { NavButton } from './components/NavButton';
import { Home, Progress } from './pages/DashboardPages';
import { Lesson } from './pages/Lesson';
import { Practice } from './pages/Practice';
import { CodePractice } from './pages/CodePractice';
import { RadialRoadmap } from './components/RadialRoadmap';
import { useHashNavigation } from './hooks/useHashNavigation';
import { recordActivity } from './state/activity';

function App() {
  const { page, patternId, codeProblemId, navigate } = useHashNavigation();
  const [completed, setCompleted] = useState<PatternId[]>(loadProgress);
  const selectedId = patternId ?? 'sliding-window';

  const selected = useMemo(
    () => patterns.find((pattern) => pattern.id === selectedId) || patterns[0],
    [selectedId]
  );

  const openLesson = (id: PatternId) => {
    navigate('lesson', id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markComplete = (id: PatternId) => {
    const next = completed.includes(id) ? completed : [...completed, id];
    setCompleted(next);
    saveProgress(next);
    if (!completed.includes(id)) recordActivity({ kind: 'lesson_complete', patternId: id, success: true });
  };

  return (
    <IonPage>
      <IonContent fullscreen className="app-content">
        <div className="app-shell">
          <aside className="side-rail">
            <button className="brand" onClick={() => navigate('home')}>
              <span className="brand-mark">&lt;/&gt;</span>
              <span><strong>STRIVER A2Z</strong><small>DSA SKILL TREE</small></span>
            </button>
            <nav>
              <NavButton active={page === 'home'} icon={homeOutline} label="Home" onClick={() => navigate('home')} />
              <NavButton active={page === 'learn' || page === 'lesson'} icon={schoolOutline} label="Roadmap" onClick={() => navigate('learn')} />
              <NavButton active={page === 'practice'} icon={flashOutline} label="Practice" onClick={() => navigate('practice')} />
              <NavButton active={page === 'code'} icon={codeSlashOutline} label="Code" onClick={() => navigate('code')} />
              <NavButton active={page === 'progress'} icon={barChartOutline} label="Progress" onClick={() => navigate('progress')} />
            </nav>
            <div className="rail-note">
              <span className="micro-label">LEARNING LOOP</span>
              <p>Understand → visualize → implement in Java → practice → master.</p>
            </div>
          </aside>
          <main className="main-stage">
            {page === 'home' && <Home completed={completed} openLesson={openLesson} goLearn={() => navigate('learn')} />}
            {page === 'learn' && <RadialRoadmap onContinue={() => navigate('practice')} />}
            {page === 'practice' && <Practice openLesson={openLesson} completed={completed} />}
            {page === 'code' && <CodePractice openLesson={openLesson} initialProblemId={codeProblemId} selectProblem={(id) => navigate('code', id)} />}
            {page === 'progress' && <Progress completed={completed} openLesson={openLesson} />}
            {page === 'lesson' && (
              <Lesson pattern={selected} isComplete={completed.includes(selected.id)} onBack={() => navigate('learn')} onComplete={() => markComplete(selected.id)} openCode={(problemId) => navigate('code', problemId)} />
            )}
          </main>
          <div className="bottom-nav">
            <NavButton active={page === 'home'} icon={homeOutline} label="Home" onClick={() => navigate('home')} />
            <NavButton active={page === 'learn' || page === 'lesson'} icon={schoolOutline} label="Roadmap" onClick={() => navigate('learn')} />
            <NavButton active={page === 'practice'} icon={flashOutline} label="Practice" onClick={() => navigate('practice')} />
            <NavButton active={page === 'code'} icon={codeSlashOutline} label="Code" onClick={() => navigate('code')} />
            <NavButton active={page === 'progress'} icon={barChartOutline} label="Progress" onClick={() => navigate('progress')} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default App;
