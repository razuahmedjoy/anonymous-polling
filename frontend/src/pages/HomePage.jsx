import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import LoadingComponent from '../components/LoadingComponent';
import { pollsApi } from '../services/api';
import PollCard from '../components/PollCard';

const HomePage = () => {

    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [, setError] = useState(null);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await pollsApi.getAllPolls();
                if (response.success) {
                    setPolls(response.data);
                } else {
                    setError('Failed to load poll');
                }
            } catch (err) {
                setError('Poll not found or may have expired');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPolls();
    }, []);

    if (loading) return <LoadingComponent />;


    return (
        <div className="flex flex-col py-48 items-center justify-center p-4 text-center">
            <div className="space-y-8 max-w-2xl">
                {/* Main Heading */}
                <h1 className="text-4xl md:text-6xl font-bold text-white 
             dark:text-white/90 mb-4">
                    Create Instant Anonymous Polls
                    <span className="block mt-2 text-2xl md:text-3xl font-normal 
                 opacity-90 dark:opacity-80">
                        Quick • Simple • Disappearing
                    </span>
                </h1>

                {/* CTA Button */}
                <Link
                    to="/create"
                    className="inline-block bg-white text-gray-800 dark:bg-indigo-600 dark:text-white 
           px-8 py-4 rounded-lg text-xl font-semibold shadow-lg 
           hover:shadow-xl transform transition-all duration-300 
           hover:scale-105 focus:outline-none focus:ring-2 
           focus:ring-white focus:ring-offset-2 
           focus:ring-offset-blue-500 dark:focus:ring-offset-slate-700
           hover:bg-gray-50 dark:hover:bg-indigo-700"
                >
                    Create Poll Now
                </Link>

                {/* Features List */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 
              text-white dark:text-white/90">
                    <div className="p-4 backdrop-blur-sm bg-white/10 dark:bg-black/10 
                rounded-lg transition-colors duration-300">
                        <h3 className="text-lg font-semibold mb-2">🚀 Instant Setup</h3>
                        <p className="text-sm opacity-80 dark:opacity-75">No signup required</p>
                    </div>
                    <div className="p-4 backdrop-blur-sm bg-white/10 dark:bg-black/10 
                rounded-lg transition-colors duration-300">
                        <h3 className="text-lg font-semibold mb-2">🕒 Time-Limited</h3>
                        <p className="text-sm opacity-80 dark:opacity-75">Auto-expiring polls</p>
                    </div>
                    <div className="p-4 backdrop-blur-sm bg-white/10 dark:bg-black/10 
                rounded-lg transition-colors duration-300">
                        <h3 className="text-lg font-semibold mb-2">🔒 Anonymous</h3>
                        <p className="text-sm opacity-80 dark:opacity-75">Private & secure</p>
                    </div>
                </div>

                {/* Additional Info */}
                <p className="text-white opacity-75 dark:opacity-85 mt-8 text-sm
            transition-colors duration-300">
                    Your poll disappears like magic after expiration.
                    <br className="hidden md:block" />
                    No traces left behind. Start creating in seconds!
                </p>

                {/* Polls List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {polls.map((poll) => (
                        <PollCard key={poll.id} poll={poll} />
                    ))}

                </div>

            </div>


        </div>
    );
};

export default HomePage;