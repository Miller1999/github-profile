"use client";

import { useEffect, useState } from "react";

interface GitHubUser {
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
  avatar_url: string;
  location: string;
  login: string;
  html_url: string;
  company: string | null;
  blog: string | null;
}

export default function Home() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username = "Miller1999";
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const API_URL = `${API_BASE_URL}/user/${username}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data (${response.status})`);
        }
        const data: GitHubUser = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">Loading profile...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-red-200 dark:border-red-900">
        <p className="text-red-500 text-lg font-semibold">Error: {error}</p>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">Make sure the backend server is running on port 3001</p>
      </div>
    </div>
  );

  if (!user) return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <p className="text-zinc-500 dark:text-zinc-400 text-lg">No user found.</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-950 p-4 text-black dark:text-white">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600" />
        <div className="px-6 pb-8 text-center">
          <div className="relative -mt-16 inline-block">
            <img
              src={user.avatar_url}
              alt={user.name || user.login}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-zinc-900 object-cover shadow-lg"
            />
          </div>

          <h2 className="mt-4 text-2xl font-bold">{user.name || user.login}</h2>
          <p className="text-blue-500 font-mono text-sm mb-1">@{user.login}</p>

          {user.company && (
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">
              🏢 {user.company}
            </p>
          )}

          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
            📍 {user.location || "No location provided"}
          </p>

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 italic leading-relaxed">
            &ldquo;{user.bio || "No bio available"}&rdquo;
          </p>

          <div className="grid grid-cols-3 gap-4 py-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
              <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Repos</p>
              <p className="text-xl font-bold">{user.public_repos}</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
              <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Followers</p>
              <p className="text-xl font-bold">{user.followers}</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
              <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Following</p>
              <p className="text-xl font-bold">{user.following}</p>
            </div>
          </div>

          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full text-sm font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-md"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>

          {user.blog && (
            <p className="mt-4 text-xs text-zinc-400">
              🌐 <a href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">{user.blog}</a>
            </p>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-zinc-400">
        Public Gists: {user.public_gists} &middot; Data from GitHub API
      </p>
    </div>
  );
}
