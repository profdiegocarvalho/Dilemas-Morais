import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilitySettings {
  guidedReading: boolean;
  focusMode: boolean;
  highContrast: boolean;
  monochrome: boolean;
}

interface AccessibilityContextType extends AccessibilitySettings {
  updateSetting: (key: keyof AccessibilitySettings, value: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibility_settings');
    return saved ? JSON.parse(saved) : {
      guidedReading: false,
      focusMode: false,
      highContrast: false,
      monochrome: false,
    };
  });

  useEffect(() => {
    localStorage.setItem('accessibility_settings', JSON.stringify(settings));
    
    // Apply classes to html element (root)
    const root = document.documentElement;
    root.classList.toggle('high-contrast', settings.highContrast);
    root.classList.toggle('monochrome', settings.monochrome);
    root.classList.toggle('focus-mode', settings.focusMode);
  }, [settings]);

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AccessibilityContext.Provider value={{ ...settings, updateSetting }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
};
