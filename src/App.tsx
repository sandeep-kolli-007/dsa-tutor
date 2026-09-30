import { useMemo, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { barChartOutline, codeSlashOutline, flashOutline, homeOutline, schoolOutline } from 'ionicons/icons';

import { patterns } from './data/patterns';
import { loadProgress, saveProgress } from './state/progress';
import type { PatternId } from './types/lesson';
import { NavButton } from './components/NavButton';
import { Home, Learn, Progress } from './pages/DashboardPages';
import { Lesson } from './pages/Lesson';
import { Practice } from './pages/Practice';
import { CodePractice } from './pages/CodePractice';
import { useHashNavigation } from './hooks/useHashNavigation';

function App() {
  const { page, patternId, navigate } = useHashNavigation();
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
  };

  return (
    <IonPage>
      <IonContent fullscreen className="app-content">
        <div className="app-shell">
          <aside className="side-rail">
            <button className="brand" onClick={() => navigate('home')}>
              <span className="brand-mark">&lt;/&gt;</span>
              <span><strong>DSA TUTOR</strong><small>PATTERN LAB</small></span>
            </button>

            <nav>
              <NavButton active={page === 'home'} icon={homeOutline} label="Home" onClick={() => navigate('home')} />
              <NavButton active={page === 'learn' || page === 'lesson'} icon={schoolOutline} label="Learn" onClick={() => navigate('learn')} />
              <NavButton active={page === 'practice'} icon={flashOutline} label="Practice" onClick={() => navigate('practice')} />
              <NavButton active={page === 'code'} icon={codeSlashOutline} label="Code" onClick={() => navigate('code')} />
              <NavButton active={page === 'progress'} icon={barChartOutline} label="Progress" onClick={() => navigate('progress')} />
            </nav>

            <div className="rail-note">
              <span className="micro-label">TEACHING RULE</span>
              <p>Real life → intuition → invariant → code → recognition.</p>
            </div>
          </aside>

          <main className="main-stage">
            {page === 'home' && <Home completed={completed} openLesson={openLesson} goLearn={() => navigate('learn')} />}
            {page === 'learn' && <Learn completed={completed} openLesson={openLesson} />}
            {page === 'practice' && <Practice openLesson={openLesson} />}
            {page === 'code' && <CodePractice openLesson={openLesson} />}
            {page === 'progress' && <Progress completed={completed} openLesson={openLesson} />}
            {page === 'lesson' && (
              <Lesson
                pattern={selected}
                isComplete={completed.includes(selected.id)}
                onBack={() => navigate('learn')}
                onComplete={() => markComplete(selected.id)}
              />
            )}
          </main>

          <div className="bottom-nav">
            <NavButton active={page === 'home'} icon={homeOutline} label="Home" onClick={() => navigate('home')} />
            <NavButton active={page === 'learn' || page === 'lesson'} icon={schoolOutline} label="Learn" onClick={() => navigate('learn')} />
            <NavButton active={page === 'practice'} icon={flashOutline} label="Practice" onClick={() => navigate('practice')} />
            <NavButton active={page === 'progress'} icon={barChartOutline} label="Progress" onClick={() => navigate('progress')} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default App;
