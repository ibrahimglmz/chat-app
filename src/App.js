import React, { useState } from 'react';
import ChatBox from './components/ChatBox';

function App() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = (e) => {
    e.preventDefault();
    if (from.trim() && to.trim()) {
      setIsStarted(true);
    }
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Sohbete Başla</h1>
          <form onSubmit={handleStart} className="space-y-4">
            <div>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700">
                Gönderen
              </label>
              <input
                type="text"
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700">
                Alıcı
              </label>
              <input
                type="text"
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors"
            >
              Sohbete Başla
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <ChatBox from={from} to={to} />
      </div>
    </div>
  );
}

export default App;
