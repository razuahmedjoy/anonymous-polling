import { Link } from 'react-router';

const PollCard = ({ poll }) => {
    // Check if poll is expired
    const isExpired = new Date(poll.expiresAt) < new Date();

    // Calculate time remaining
    const getTimeRemaining = () => {
        if (isExpired) return 'Expired';

        const now = new Date();
        const expiry = new Date(poll.expiresAt);
        const diffTime = expiry - now;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
            return `${diffDays} day${diffDays !== 1 ? 's' : ''} left`;
        }

        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        if (diffHours > 0) {
            return `${diffHours} hour${diffHours !== 1 ? 's' : ''} left`;
        }

        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} left`;
    };

    return (
        <Link to={`/polls/${poll.id}`} className="block h-full">
            <div className="h-full bg-gray-200 dark:bg-gray-800 border-indigo-600 border text-white rounded-lg shadow-md hover:shadow-lg transition-shadow py-4 px-2 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white line-clamp-2">
                        {poll.question}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                        {poll.options.length} options
                    </p>
                </div>

                <div className="items-center text-sm">

                    <span className={`px-2 py-1 rounded ${isExpired ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                        {getTimeRemaining()}
                    </span>
                </div>


                <div className="mt-4 flex space-x-4 text-sm text-gray-500">

                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        {poll.reactions.likes}
                    </div>



                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        {poll.reactions.trending}
                    </div>

                </div>

            </div>
        </Link>
    );
};

export default PollCard;