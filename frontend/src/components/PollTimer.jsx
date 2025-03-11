import { useState, useEffect } from 'react';

const PollTimer = ({ expiresAt }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const expiryDate = new Date(expiresAt);
            const difference = expiryDate - now;

            if (difference <= 0) {
                setTimeLeft('Poll has expired');
                return;
            }

            // Calculate time components
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Format time string
            let timeString = '';
            if (days > 0) {
                timeString += `${days}d `;
            }

            timeString += `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            setTimeLeft(timeString);
        };

        // Initial calculation
        calculateTimeLeft();

        // Set up interval for countdown
        const timer = setInterval(calculateTimeLeft, 1000);

        // Clean up interval
        return () => clearInterval(timer);
    }, [expiresAt]);

    return (
        <div className="mt-2 font-medium">
            {timeLeft.includes('expired') ? (
                <span className="text-red-600">
                    Poll has expired
                </span>
            ) : (
                <span className="text-green-600">
                    Time remaining: {timeLeft}
                </span>
            )}
        </div>
    );
};

export default PollTimer;