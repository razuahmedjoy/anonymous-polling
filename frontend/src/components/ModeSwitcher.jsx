import React, { useEffect, useState } from 'react';

const ModeSwitcher = () => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        // Check user preference on mount
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);

        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        }
    }, []);


    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkMode', (!darkMode).toString());
        document.documentElement.classList.toggle('dark');
    };
    return (
        <button
            onClick={toggleDarkMode}
            className="fixed right-5 bottom-20 p-2 bg-white dark:bg-gray-400 dark:text-white cursor-pointer rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-label="Toggle dark mode"
        >
            {darkMode ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            )}
        </button>
    );
};

export default ModeSwitcher;