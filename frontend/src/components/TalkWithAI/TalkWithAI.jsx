import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TalkWithAI = () => {
  const [prompt, setPrompt] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchChats = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/chat/all-chats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      setChats(res.data.chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
      toast.error("Failed to fetch chats. Please try again.", { autoClose: 2000 });
    }
  };

  useEffect(() => {
    fetchChats(); // Fetch chats when component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error("Please enter a prompt!", { autoClose: 2000 });
      return;
    }

    const newChat = { sender: 'user', message: prompt };
    setChats(prevChats => [...prevChats, newChat]);

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/api/v1/chat/new', { prompt }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      const aiResponse = res.data.chats[res.data.chats.length - 1]; // Last chat from AI
      setChats(prevChats => [...prevChats, aiResponse]);
    } catch (error) {
      console.error("Error:", error);
      setChats(prevChats => [...prevChats, { sender: 'ai', message: 'Something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
      setPrompt(''); // Clear input field
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="p-4 bg-gray-800 text-xl font-semibold">
        Talk with AI
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-900">
        {chats.length === 0 && <p className="text-center text-gray-500">Ask me anything!</p>}
        {chats.map((chat, index) => (
          <div key={index} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg p-4 max-w-xl ${chat.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
              {chat.message}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-lg p-4 max-w-xl bg-gray-800 text-gray-200">AI is thinking...</div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-gray-800 flex items-center space-x-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 p-3 rounded-lg font-semibold transition-colors duration-300"
          disabled={loading}
        >
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </form>
    </div>
  );
};

export default TalkWithAI;
