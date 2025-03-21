"use client";

import { useState, useEffect } from "react";
import { MdPerson, MdMusicNote, MdMood } from "react-icons/md";
import { useRouter } from "next/navigation";
import { authenticateAdmin } from "@/app/services";
import { PasswordPrompt, DashboardCard } from "@/app/components/admin";

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticatedSession =
        sessionStorage.getItem("adminAuthenticated");
      if (isAuthenticatedSession) {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setShowPasswordPrompt(true);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handlePasswordSubmit = async (username: string, password: string) => {
    if (!password || !username) {
      router.push("/");
      return;
    }

    try {
      const isAuthenticated = await authenticateAdmin(username, password);
      if (isAuthenticated) {
        setIsAuthenticated(true);
        sessionStorage.setItem("adminAuthenticated", "true");
      } else {
        alert("Invalid username or password");
        router.push("/");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      router.push("/");
    }
    setShowPasswordPrompt(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="text-xl text-gray-600 dark:text-gray-300">
          Loading...
        </div>
      </div>
    );
  }

  if (showPasswordPrompt) {
    return <PasswordPrompt onSubmit={handlePasswordSubmit} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const dashboardCards = [
    {
      title: "Artists",
      description: "Manage artists in your database",
      icon: MdPerson,
      href: "/admin/artists",
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
      hoverColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Songs",
      description: "Manage songs in your database",
      icon: MdMusicNote,
      href: "/admin/songs",
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
      hoverColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Vibes",
      description: "Manage vibes in your database",
      icon: MdMood,
      href: "/admin/vibes",
      iconColor: "text-green-600 dark:text-green-400",
      iconBgColor: "bg-green-100 dark:bg-green-900/30",
      hoverColor: "text-green-600 dark:text-green-400",
    },
  ];

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
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Use this admin interface to manage your music database and verify
            data. Select a category below to get started.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dashboardCards.map((card, index) => (
              <DashboardCard key={index} {...card} />
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Tips
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            <li>
              Ensure all artists are properly linked to their songs for proper
              relationships
            </li>
            <li>For the best experience, include image URLs for artists</li>
            <li>Create vibes to categorize your songs effectively</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
