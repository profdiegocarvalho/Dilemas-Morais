import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { Judge } from './pages/Judge';
import { Results } from './pages/Results';
import { AdminPanel } from './pages/Admin';
import { AppState } from './types';
import { AccessibilityProvider } from './lib/AccessibilityContext';
import { AuthProvider } from './lib/AuthContext';
import { AccessibilityToolbar, GuidedReadingOverlay } from './components/AccessibilityFeatures';

export default function App() {
  const [view, setView] = useState<AppState>('home');

  const startJudging = () => setView('judging');
  const showResults = () => setView('results');
  const showAdmin = () => setView('admin');
  const reset = () => setView('home');

  return (
    <AuthProvider>
      <AccessibilityProvider>
        <MainLayout onNavigateAdmin={showAdmin}>
          {view === 'home' && <Home onStart={startJudging} />}
          {view === 'judging' && <Judge onComplete={showResults} />}
          {view === 'results' && <Results onReset={reset} />}
          {view === 'admin' && <AdminPanel onNavigate={setView} />}
        </MainLayout>
        <AccessibilityToolbar />
        <GuidedReadingOverlay />
      </AccessibilityProvider>
    </AuthProvider>
  );
}
