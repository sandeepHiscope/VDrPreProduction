// src/components/InstallPromptToast.jsx
import React from 'react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

const InstallPromptToast = () => {
  const { showInstallToast, installApp, closeToast } = useInstallPrompt();

  if (!showInstallToast) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 flex items-center justify-between z-50 animate-fade-in border border-slate-200 dark:border-slate-700">
      <div className="flex items-center">
        <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-slate-900 dark:text-white">Install VDr App</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Add to home screen for faster access</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <button
          onClick={installApp}
          className="mr-2 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Install
        </button>
        <button
          onClick={closeToast}
          className="text-slate-400 hover:text-slate-500 focus:outline-none"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InstallPromptToast;