/** @format */

import React, { useState } from "react";
import Dropdown from "./Dropdown";

interface GitHubUser {
  login: string;
  avatar_url: string;
}

interface Props {
  onSelectUser: (username: string) => void;
}

const Search: React.FC<Props> = ({ onSelectUser }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchUsers = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${query}&per_page=5`
      );
      const data = await res.json();
      setUsers(data.items || []);
    } catch {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") searchUsers();
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        className="border p-2 w-full rounded"
        placeholder="Search GitHub username"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={searchUsers}
        className="text-center items-center w-48 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 !w-full"
        type="button">
        Search
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-full flex gap-2 flex-col">
        {users.map((user) => (
          <Dropdown
            key={user.login}
            avatar_url={user?.avatar_url}
            username={user?.login}
            onSelectUser={onSelectUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
