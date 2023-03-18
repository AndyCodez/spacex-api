import React from 'react';
import Launches from './components/Launches';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <a href="github.com/andycodez" className="text-xl font-semibold text-gray-800">SpaceX Launches</a>
            </div>
            <div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg" type="submit">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto py-2">
        <Launches />
      </div>
      <footer className="bg-white border-t border-gray-400 shadow">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2023 AO SpaceX Launches
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
