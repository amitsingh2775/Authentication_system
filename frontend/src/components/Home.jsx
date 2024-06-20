import React, { useState } from 'react';

const Home = () => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handlePostComment = () => {
    // Implement logic to post comment (e.g., send to backend)
    console.log('Posting comment:', comment);
    // Clear comment textarea after posting
    setComment('');
  };

  return (
    <div className="bg-white overflow-hidden shadow-none">
      <div className="grid grid-cols-3 min-w-full">

        {/* Left Column */}
        <div className="col-span-2 w-full">
          <img
            className="w-full max-w-full min-w-full"
            src="https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            alt="Description"
          />
        </div>

        {/* Right Column */}
        <div className="col-span-1 relative pl-4">
          <header className="border-b border-gray-400">
            <div className="block cursor-pointer py-4 flex items-center text-sm outline-none focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
              <img
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                className="h-9 w-9 rounded-full object-cover"
                alt="user"
              />
              <p className="block ml-2 font-bold">Paul</p>
            </div>
          </header>

          {/* Comments Section */}
          <div>
            <div className="pt-1">
              {/* Comment 1 */}
              <div className="text-sm mb-2 flex flex-start items-center">
                <div>
                  <a href="#" className="cursor-pointer flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                      alt="user"
                    />
                  </a>
                </div>
                <p className="font-bold ml-2">
                  <a className="cursor-pointer">Joshua:</a>
                  <span className="text-gray-700 font-medium ml-1">
                    {comment}
                  </span>
                </p>
              </div>

              {/* Comment 2 */}
              <div className="text-sm mb-2 flex flex-start items-center">
                <div>
                  <a href="#" className="cursor-pointer flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://images.pexels.com/photos/3861456/pexels-photo-3861456.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                      alt="user"
                    />
                  </a>
                </div>
                <p className="font-bold ml-2">
                  <a className="cursor-pointer">Kesha:</a>
                  <span className="text-gray-700 font-medium ml-1">
                    This is amazing
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="absolute bottom-0 left-0 right-0 pl-4">
            <div className="pt-4">
              <div className="mb-2">
                <div className="flex items-center">
                  <span className="mr-3 inline-flex items-center cursor-pointer">
                    <svg className="fill-heart text-gray-700 inline-block h-7 w-7 heart" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </span>
                  <span className="mr-3 inline-flex items-center cursor-pointer">
                    <svg className="text-gray-700 inline-block h-7 w-7 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </span>
                </div>
                <span className="text-gray-600 text-sm font-bold">2344 Likes</span>
              </div>
              <span className="block ml-2 text-xs text-gray-600">5 minutes</span>
            </div>

            {/* Comment Box */}
            <div className="pt-4 pb-1 pr-3">
              <div className="flex items-start">
                <textarea
                  className="w-full resize-none outline-none appearance-none"
                  aria-label="Agrega un comentario..."
                  placeholder="Agrega un comentario..."
                  autoComplete="off"
                  autoCorrect="off"
                  style={{ height: '36px' }}
                  value={comment}
                  onChange={handleCommentChange}
                />
                <button
                  className="mb-2 focus:outline-none border-none bg-transparent text-blue-600"
                  onClick={handlePostComment}
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
