import React, { useState } from "react";

interface PasswordPromptProps {
  onSubmit: (username: string, password: string) => void;
}

const PasswordPrompt: React.FC<PasswordPromptProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Admin Authentication
        </h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 
                   dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
                   focus:ring-purple-500 dark:focus:ring-purple-400 mb-4"
          autoFocus
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 
                   dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
                   focus:ring-purple-500 dark:focus:ring-purple-400"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white 
                   font-medium py-2 px-4 rounded transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordPrompt;
