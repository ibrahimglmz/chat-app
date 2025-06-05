import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const ChatBox = ({ from, to }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Kullanıcı bağlandığında
    socket.emit('join', { from, to });

    // Mesaj alma
    socket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Önceki mesajları alma
    socket.on('previousMessages', (previousMessages) => {
      setMessages(previousMessages);
    });

    return () => {
      socket.off('message');
      socket.off('previousMessages');
    };
  }, [from, to]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: from,
      receiver: to,
      timestamp: new Date(),
    };

    // Mesajı gönder
    socket.emit('sendMessage', message);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[600px] bg-gray-100 rounded-lg shadow-lg">
      <div className="p-4 bg-primary text-white rounded-t-lg">
        <h2 className="text-xl font-semibold">Sohbet: {from} ve {to}</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === from ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === from
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {format(new Date(message.timestamp), 'HH:mm')}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="flex-1 rounded-lg border-gray-300 focus:ring-primary focus:border-primary"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
          >
            Gönder
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox; 