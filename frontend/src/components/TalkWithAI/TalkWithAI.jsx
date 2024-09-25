import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TalkWithAI = () => {
  const [prompt, setPrompt] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error("Please enter a prompt!", { autoClose: 2000 });
      return;
    }

    // Add user's message to chat
    const newChat = { sender: 'user', message: prompt };
    setChats([...chats, newChat]);

    setLoading(true);

    try {
      // Simulate API call to Gemini API
      const res = await axios.post('https://your-gemini-api-endpoint.com/api/ask', {
        prompt: prompt,
      }, {
        headers: {
          'Authorization': `Bearer YOUR_GEMINI_API_TOKEN`,
          'Content-Type': 'application/json',
        },
      });

      const aiResponse = res.data.answer || "I couldn't find an answer for that.";
      setChats([...chats, newChat, { sender: 'ai', message: aiResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setChats([...chats, newChat, { sender: 'ai', message: 'Something went wrong. Please try again.' }]);
    }
    setLoading(false);
    setPrompt(''); // Clear input field
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Chat Header */}
      <div className="p-4 bg-gray-800 text-xl font-semibold">
        Talk with AI
      </div>

      {/* Chat Display */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-900">
        {chats.length === 0 && (
          <p className="text-center text-gray-500">Ask me anything!</p>
        )}

        {chats.map((chat, index) => (
          <div key={index} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg p-4 max-w-xl ${chat.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
              {chat.message}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-lg p-4 max-w-xl bg-gray-800 text-gray-200">
              AI is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
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
