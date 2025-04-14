"use client";

import { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { getMovieReviews } from "../services/api"; // Import the API function

interface OpenReviewsModalProps {
  movieId: string; // Prop for the movie's ID
}

const OpenReviewsModal = ({ movieId }: OpenReviewsModalProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]); // State to hold reviews
  const [loading, setLoading] = useState(false); // State to track loading

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const reviewsData = await getMovieReviews(movieId);
        console.log("Reviews Data:", reviewsData); // Debugging log
        setReviews(reviewsData.results || reviewsData || []);
        console.log("Reviews:", reviewsData.results || reviewsData);

        // Ensure reviews are properly set
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isModalVisible) {
      fetchReviews(); // Fetch reviews when the modal is opened
    }
  }, [isModalVisible, movieId]);

  return (
    <div className="flex justify-center">
      {/* Beautiful cinematic button */}
      <Button
        type="primary"
        onClick={showModal}
        className="relative overflow-hidden group w-auto mt-5 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-none"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 10H16M8 14H12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.933 3.58001 15.7239 4.5903 17.2198L3.5 20.5L6.78015 19.4097C8.27606 20.42 10.067 21 12 21Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Read Reviews
        </span>
        <div className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full skew-x-12 group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></div>
      </Button>

      {/* Enhanced Modal */}
      <Modal
        className="reviews-modal"
        width={800}
        title={null}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        closeIcon={
          <CloseOutlined className="text-white/80 hover:text-white text-xl transition-colors" />
        }
        modalRender={(modal) => (
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl">
            {modal}
          </div>
        )}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 10H16M8 14H12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.933 3.58001 15.7239 4.5903 17.2198L3.5 20.5L6.78015 19.4097C8.27606 20.42 10.067 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">Movie Reviews</h2>
          </div>
          <div className="flex items-center gap-2"></div>
        </div>
        
        {/* Modal Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-600/30 border-t-indigo-600 animate-spin mb-4"></div>
              <p className="text-indigo-300 font-medium">Loading reviews...</p>
            </div>
          ) : Array.isArray(reviews) && reviews.length > 0 ? (
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-indigo-500/10 hover:border-gray-600/50 group"
                >
                  {/* Decorative elements */}
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-md -rotate-6 opacity-70 group-hover:rotate-0 transition-all duration-300"></div>

                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {review.author
                            ? review.author.charAt(0).toUpperCase()
                            : "?"}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {review.author || "Anonymous"}
                          </h3>
                          {review.author_details?.rating && (
                            <div className="flex items-center mt-1">
                              <svg
                                className="w-4 h-4 text-yellow-500 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                              <span className="text-xs font-medium text-gray-300">
                                {review.author_details.rating}/10
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {review.created_at && (
                        <span className="text-xs text-gray-400 bg-gray-800/70 px-3 py-1 rounded-full">
                          {new Date(review.created_at).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      )}
                    </div>

                    {/* Review content with gradient border */}
                    <div className="relative mt-4 pl-4 border-l-2 border-indigo-500/30 group-hover:border-indigo-500 transition-colors">
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line line-clamp-6 group-hover:line-clamp-none transition-all duration-300">
                        {review.content}
                      </p>

                      {review.content.length > 300 && (
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-800/90 to-transparent group-hover:opacity-0 transition-opacity pointer-events-none"></div>
                      )}
                    </div>

                    {/* Read more indicator for long reviews */}
                    {review.content.length > 300 && (
                      <div className="mt-2 text-right">
                        <span className="text-xs text-indigo-400 group-hover:opacity-0 transition-opacity">
                          Click to expand
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-800/70 flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8.5 9H15.5M8.5 13H12M7 19.5C4.65279 19.5 3 17.8472 3 15.5V8.5C3 6.15279 4.65279 4.5 7 4.5H17C19.3472 4.5 21 6.15279 21 8.5V15.5C21 17.8472 19.3472 19.5 17 19.5H12L7 19.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-300 mb-2">
                No Reviews Yet
              </h3>
              <p className="text-gray-400 max-w-md">
                It looks like no one has reviewed this movie yet. Check back
                later or be the first to share your thoughts!
              </p>
            </div>
          )}
        </div>
      </Modal>

      <style jsx global>{`
        .reviews-modal .ant-modal-content {
          background: transparent;
          box-shadow: none;
          padding: 0;
        }

        .reviews-modal .ant-modal-close {
          top: 16px;
          right: 16px;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #8b5cf6);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4f46e5, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default OpenReviewsModal;
