'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MdPerson, MdMusicNote, MdMood } from 'react-icons/md';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen dark:bg-gray-900">
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Music Vibe Admin</h1>
          <p className="mt-2 text-purple-100 text-lg">
            Control panel for your music database
          </p>
        </div>
      </header>
      
      <main className="container mx-auto p-6 mt-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Dashboard Overview</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Use this admin interface to manage your music database and verify data. Select a category below to get started.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link 
              href="/admin/artists"
              className="group p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mb-4">
                <MdPerson className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Artists</h2>
              <p className="text-gray-500 dark:text-gray-400">Manage artists in your database</p>
            </Link>
            
            <Link 
              href="/admin/songs"
              className="group p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                <MdMusicNote className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Songs</h2>
              <p className="text-gray-500 dark:text-gray-400">Manage songs in your database</p>
            </Link>
            
            <Link 
              href="/admin/vibes"
              className="group p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-4">
                <MdMood className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Vibes</h2>
              <p className="text-gray-500 dark:text-gray-400">Manage vibes in your database</p>
            </Link>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Quick Tips</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
            <li>Add artists before adding songs for proper relationships</li>
            <li>For the best experience, include image URLs for artists</li>
            <li>Create vibes to categorize your songs effectively</li>
            <li>All data changes are immediately reflected in the database</li>
          </ul>
        </section>
      </main>
      
      <footer className="mt-auto py-6 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto">
          <p>Music Vibe Admin Dashboard © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}