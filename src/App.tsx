import { useMemo, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { barChartOutline, flashOutline, homeOutline, schoolOutline } from 'ionicons/icons';

import { patterns } from './data/patterns';
import { loadProgress, saveProgress } from './state/progress';
import type { Page, PatternId } from './types/lesson';
import { NavButton } from './components/NavButton';
import { Home, Learn, Progress } from './pages/DashboardPages';
import { Lesson } from './pages/Lesson';
import { Practice } from './pages/Practice';

function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedId, setSelectedId] = useState<PatternId>('sliding-window');
  const [completed, setCompleted] = useState<PatternId[]>(loadProgress);

  const selected = useMemo(
    () => patterns.find((pattern) => pattern.id === selectedId) || patterns[0],
    [selectedId]
  );

  const openLesson = (id: PatternId) => {
    setSelectedId(id);
    setPage('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markComplete = (id: PatternId) => {
    const next = completed.includes(id) ? completed : [...completed, id];
    setCompleted(next);
    saveProgress(next);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="app-content">
        <div className="app-shell">
          <aside className="side-rail">
            <button className="brand" onClick={() => setPage('home')}>
              <span className="brand-mark">&lt;/&gt;</span>
              <span><strong>DSA TUTOR</strong><small>PATTERN LAB</small></span>
            </button>

            <nav>
              <NavButton active={page === 'home'} icon={homeOutline} label="Home" onClick={() => setPage('home')} />
              <NavButton active={page === 'learn' || page === 'lesson'} icon={schoolOutline} label="Learn" onClick={() => setPage('learn')} />
              <NavButton active={page === 'practice'} icon={flashOutline} label="Practice" onClick={() => setPage('practice')} />
              <NavButton active={page === 'progress'} icon={barChartOutline} label="Progress" onClick={() => setPage('progress')} />
            </nav>

            <div className="rail-note">
              <span className="micro-label">TEACHING RULE</span>
              <p>Real life → intuition → invariant → code → recognition.</p>
            </div>
          </aside>

          <main className="main-stage">
            {page === 'home' && <Home completed={completed} openLesson={openLesson} goLearn={() => setPage('learn')} />}
            {page === 'learn' && <Learn completed={completed} openLesson={openLesson} />}
            {page === 'practice' && <Practice openLesson={openLesson} />}
            {page === 'progress' && <Progress completed={completed} openLesson={openLesson} />}
            {page === 'lesson' && (
              <Lesson
                pattern={selected}
                isComplete={completed.includes(selected.id)}
                onBack={() => setPage('learn')}
                onComplete={() => markComplete(selected.id)}
              />
            )}
          </main>

          <div className="bottom-nav">
            <NavButton active={page === 'home'} icon={homeOutline} label="Home" onClick={() => setPage('home')} />
            <NavButton active={page === 'learn' || page === 'lesson'} icon={schoolOutline} label="Learn" onClick={() => setPage('learn')} />
            <NavButton active={page === 'practice'} icon={flashOutline} label="Practice" onClick={() => setPage('practice')} />
            <NavButton active={page === 'progress'} icon={barChartOutline} label="Progress" onClick={() => setPage('progress')} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default App;
