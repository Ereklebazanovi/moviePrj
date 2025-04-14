"use client";

import { useState } from "react";
import { Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons"; // Import the close icon

interface OpenModalProps {
  movieImage: string; // Prop for the movie's image URL
  movieName: string; // Prop for the movie's name
}

const OpenModal = ({ movieImage, movieName }: OpenModalProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex justify-center">
      {/* Beautiful cinematic button */}
      <Button
        type="primary"
        onClick={showModal}
        className="group relative overflow-hidden w-auto mt-5 px-6 py-2.5 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 rounded-md text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-gray-600"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 12.4C2 9.38301 2 7.87452 2.43597 6.63998C2.81947 5.52523 3.52523 4.81947 4.63998 4.43597C5.87452 4 7.38301 4 9.4 4H14.6C16.617 4 18.1255 4 19.36 4.43597C20.4748 4.81947 21.1805 5.52523 21.564 6.63998C22 7.87452 22 9.38301 22 12.4V12.6C22 15.617 22 17.1255 21.564 18.36C21.1805 19.4748 20.4748 20.1805 19.36 20.564C18.1255 21 16.617 21 14.6 21H9.4C7.38301 21 5.87452 21 4.63998 20.564C3.52523 20.1805 2.81947 19.4748 2.43597 18.36C2 17.1255 2 15.617 2 12.6V12.4Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 15L12 12M12 9H12.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          View Poster
        </span>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500/10 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></div>
      </Button>

      {/* Enhanced Modal */}
      <Modal
        className="poster-modal"
        width={700}
        title={null}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        closeIcon={
          <CloseOutlined className="text-white/80 hover:text-white transition-colors" />
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
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 5.49683V18.5032C4 20.05 5.68077 21.0113 7.01404 20.227L18.0694 13.7239C19.384 12.9506 19.384 11.0494 18.0694 10.2761L7.01404 3.77296C5.68077 2.98869 4 3.95 4 5.49683Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">{movieName}</h2>
          </div>
          <div className="flex items-center gap-2">
           
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8 flex justify-center items-center bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=500&width=800')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/80">
          <div className="relative group">
            {/* Decorative frame */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

            {/* Poster container */}
            <div className="relative flex justify-center items-center bg-gray-900 p-1 rounded-lg ring-1 ring-gray-700/50 overflow-hidden">
              {/* Poster image with hover effect */}
              <div className="relative overflow-hidden rounded-md transform group-hover:scale-[1.01] transition-all duration-500">
                <img
                  src={movieImage || "/placeholder.svg"}
                  alt={movieName}
                  className="max-h-[500px] object-cover rounded-md shadow-2xl transform transition-transform duration-500"
                />

                {/* Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Film grain texture */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 mix-blend-overlay"></div>
              </div>
            </div>

            {/* Reflection effect */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-amber-500/10 to-transparent transform translate-y-full"></div>
          </div>
        </div>
      </Modal>

      <style>{`
  .poster-modal .ant-modal-content {
    background: transparent;
    box-shadow: none;
    padding: 0;
  }

  .poster-modal .ant-modal-close {
    top: 16px;
    right: 16px;
  }
`}
</style>
    </div>
  );
};

export default OpenModal;
