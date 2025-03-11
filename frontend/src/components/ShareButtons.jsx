import { useState } from 'react';
import { toast } from 'react-hot-toast';

const ShareButtons = ({ pollId, showText = 'Share this poll' }) => {
    const [copied, setCopied] = useState(false);

    // Get the full URL to the poll
    const pollUrl = `${window.location.origin}/polls/${pollId}`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(pollUrl)
            .then(() => {
                setCopied(true);
                toast.success('Link copied to clipboard!');

                // Reset copied state after 2 seconds
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                toast.error('Failed to copy link');
            });
    };

    const shareOnTwitter = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=Check out this poll&url=${encodeURIComponent(pollUrl)}`;
        window.open(twitterUrl, '_blank');
    };

    const shareOnFacebook = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pollUrl)}`;
        window.open(facebookUrl, '_blank');
    };

    const shareOnWhatsApp = () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this poll: ${pollUrl}`)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-800 dark:text-white">{showText}</h3>

            <div className="flex flex-wrap gap-2">
                <button
                    onClick={handleCopyLink}
                    className={`flex items-center justify-center p-1 rounded-md ${copied ? 'bg-green-100 text-green-800' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
           
                </button>

                <button
                    onClick={shareOnTwitter}
                    className="flex items-center justify-center p-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
               
                </button>

                <button
                    onClick={shareOnFacebook}
                    className="flex items-center justify-center p-1 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325 1.42-3.592 3.5-3.592.699-.002 1.399.034 2.095.107v2.42h-1.435c-1.128 0-1.348.538-1.348 1.325v1.735h2.697l-.35 2.725h-2.348V21H20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z" />
                    </svg>
                
                </button>

                <button
                    onClick={shareOnWhatsApp}
                    className="flex items-center justify-center p-1 rounded-md bg-green-100 hover:bg-green-200 text-green-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.4 3.6C18.2 1.3 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6l-1.7 6.2 6.4-1.7c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.6-8.4zm-8.4 18.4c-1.8 0-3.6-.5-5.1-1.4l-.3-.2-3.8 1 1-3.8-.2-.3c-1-1.6-1.5-3.4-1.5-5.2 0-5.5 4.5-10 10-10 2.6 0 5.1 1 7 2.9s2.9 4.4 2.9 7c0 5.4-4.5 9.9-10 10zm6-7.4c-.3-.1-1.8-.9-2.1-1s-.5-.1-.7.1c-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.6-1.4-3.7-3.2-.2-.3 0-.5.1-.7l.4-.5c.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-1-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.4-1 1-1 2.4s1 2.8 1.2 3c.2.2 2.1 3.9 5.2 5.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.7-.4z" />
                    </svg>
              
                </button>
            </div>
        </div>
    );
};

export default ShareButtons;