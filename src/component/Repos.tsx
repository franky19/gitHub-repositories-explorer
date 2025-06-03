/** @format */

import { useEffect, useState } from "react";

type Repo = {
  name: string;
  description: string;
  stargazers_count: number;
  // add other fields you need
};
// const token = process.env.REACT_APP_GITHUB_TOKEN;
const token = import.meta.env.VITE_GITHUB_TOKEN;
const MyComponent = ({ username }: { username: string }) => {
  console.log("token:", token);
//   const [repos, setRepos] = useState<Repo[]>([]);
  const [detailRepos, setDetailRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReposAndDetails = async () => {
      setLoading(true);
      setError("");
      try {
        // 1. Fetch repos list
        const res = await fetch(
          `https://api.github.com/users/${username}/repos`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch repos list");
        const reposList = await res.json();

        // 2. Fetch details for each repo in parallel
        const detailedRepos = await Promise.all(
          reposList.map(async (repo: { name: string }) => {
            const detailRes = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}`,
              {
                headers: {
                  Authorization: `token ${token}`,
                },
              }
            );
            if (!detailRes.ok)
              throw new Error(`Failed to fetch details for ${repo.name}`);
            return await detailRes.json();
          })
        );

        setDetailRepos(detailedRepos);
      } catch (err: any) {
        setError(err.message || "Failed to fetch repositories.");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchReposAndDetails();
    }
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Repos List</h2>
      <ul className="space-y-2">
        {detailRepos.map((repo) => (
          <li
            key={repo.name}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md border border-gray-200 transition-all duration-300">
            <h3 className="text-lg font-semibold text-blue-600">{repo.name}</h3>
            <p className="text-sm text-gray-600">{repo.description}</p>
            <div className="mt-2 text-sm text-yellow-600 font-medium flex items-center gap-1">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.431L24 9.588l-6 5.851L19.335 24 12 20.127 4.665 24 6 15.439 0 9.588l8.332-1.57z" />
              </svg>
              {repo.stargazers_count} stars
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
