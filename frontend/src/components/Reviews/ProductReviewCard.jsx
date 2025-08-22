import ReviewStar from './ReviewStar'
import { useAuthContext } from '../../Context/AuthContext';

const ProductReviewCard = ({ reviews }) => {
    const { user } = useAuthContext();

    // Function to format date as relative time (e.g., "5 days ago")
    const formatRelativeTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return interval === 1 ? `${interval} ${unit} ago` : `${interval} ${unit}s ago`;
            }
        }

        return 'Just now';
    };

    return (
        <div className="mt-10 space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Customer Reviews</h3>

            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="">
                            <div className="flex items-center justify-between">
                                <div className="text-gray-700 font-medium">
                                    @{user && (user.email.split('@')[0])}
                                </div>
                                <div>
                                    <ReviewStar rating={parseInt(review.rating)} />
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-800 mt-3 leading-relaxed text-sm bg-gray-50 p-3 rounded">{review.feedback}</p>

                        <div className="mt-3 text-xs text-gray-400">
                            <p className="ml-2 text-sm text-gray-500">
                                {formatRelativeTime(review.createdAt)}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                </div>
            )}
        </div>
    )
}

export default ProductReviewCard;