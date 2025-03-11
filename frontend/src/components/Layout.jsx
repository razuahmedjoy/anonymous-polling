import { Link } from 'react-router';
import ModeSwitcher from './ModeSwitcher';



const Layout = ({ children }) => {
    // const [darkMode, setDarkMode] = useState(true);

    // useEffect(() => {
    //     // Check user preference on mount
    //     const isDarkMode = localStorage.getItem('darkMode') === 'true';
    //     setDarkMode(isDarkMode);

    //     if (isDarkMode) {
    //         document.documentElement.classList.add('dark');
    //     }
    // }, []);

    // const toggleDarkMode = () => {
    //     setDarkMode(!darkMode);
    //     localStorage.setItem('darkMode', (!darkMode).toString());
    //     document.documentElement.classList.toggle('dark');
    // };

    return (
        <div className="min-h-screen flex flex-col justify-between transition-all duration-300">
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0 flex items-center">
                                <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                    Anonymous Polls
                                </h1>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            {/* <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
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
                            </button> */}
                        </div>
                    </div>
                </div>
            </header>

            <main className='grow h-full bg-gradient-to-br from-purple-800  to-indigo-800 
        dark:from-slate-900 dark:via-slate-800 dark:to-slate-700'>
                {children}
            </main>

            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        Anonymous Polls - Create polls that disappear after a set time
                    </div>
                </div>
            </footer>

            <ModeSwitcher />
        </div>
    );
};

export default Layout;