import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const TalkWithAIStudent = () => {
  const [prompt, setPrompt] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const toastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  // Load chats from localStorage when the component mounts
  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
    setChats(storedChats);
  }, []);

  // Function to fetch chats from the API
  const fetchChats = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/chat/all-chats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.data.chats && res.data.chats.length > 0) {
        setChats(res.data.chats.map(chat => ({ ...chat, id: uuidv4() })));
        localStorage.setItem('chats', JSON.stringify(res.data.chats));
      } else {
        console.log("No chats found for the user.");
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
      toast.error("Failed to fetch chats. Please try again.", { autoClose: 2000 },toastOptions);
    }
  };

  // Fetch chats when component mounts
  useEffect(() => {
    fetchChats();
  }, []);

  // Function to handle chat submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error("Please enter a prompt!", { autoClose: 2000 });
      return;
    }

    const newChat = { id: uuidv4(), role: 'user', content: prompt };
    const updatedChats = [...chats, newChat];
    setChats(updatedChats);
    localStorage.setItem('chats', JSON.stringify(updatedChats));

    const chatHistory = updatedChats.map(chat => `${chat.role}: ${chat.content}`).join('\n');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/api/v1/chat/new', { 
        prompt, 
        history: chatHistory 
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      const aiResponse = res.data && res.data.data 
        ? { id: uuidv4(), role: 'assistant', content: res.data.data.trim() }
        : { id: uuidv4(), role: 'assistant', content: 'No response from AI.' };

      const finalChats = [...updatedChats, aiResponse];
      setChats(finalChats);
      localStorage.setItem('chats', JSON.stringify(finalChats));

    } catch (error) {
      console.error("Error:", error);
      setChats(prevChats => [...prevChats, { id: uuidv4(), role: 'assistant', content: 'Something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
      setPrompt(''); // Clear input field
    }
  };

  // Function to delete all chats
  const deleteChats = async () => {
    try {
      await axios.delete('http://localhost:8000/api/v1/chat/delete', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      setChats([]);
      localStorage.removeItem('chats');
      toast.success("Chats cleared successfully!", { autoClose: 2000 },toastOptions);
    } catch (error) {
      console.error("Error deleting chats:", error);
      toast.error("Failed to delete chats. Please try again.", { autoClose: 2000 },toastOptions);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <ToastContainer />
      <div className="p-4 bg-gray-800 text-xl font-semibold font-dosis flex justify-between items-center">
        <button 
          onClick={deleteChats} 
          className="bg-red-600 hover:bg-red-500 p-2 rounded-lg font-semibold transition-colors duration-300"
        >
          Delete Chats
        </button>
        <span>Talk with AI</span>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-900 font-dosis">
        {chats.length === 0 && <p className="text-center text-gray-500">Ask me anything!</p>}
        {chats.map((chat) => (
          <div key={chat.id} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg p-4 max-w-xl ${chat.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200'} font-dosis`}>
              {chat.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-lg p-4 max-w-xl bg-gray-800 text-gray-200 font-dosis">AI is thinking...</div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-gray-800 flex items-center space-x-4 font-dosis">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-dosis"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 p-3 rounded-lg font-semibold transition-colors duration-300 font-dosis"
          disabled={loading}
        >
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </form>
    </div>
  );
};

export default TalkWithAIStudent;
