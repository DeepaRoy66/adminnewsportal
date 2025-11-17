"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, FileText, Eye, Trash2, Edit } from "lucide-react";

export default function AdminDashboard() {
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllNews();
  }, []);

  const loadAllNews = () => {
    try {
      const categories = ["telecom", "internet", "business", "social-media", "cybersecurity"];
      let all = [];

      categories.forEach((cat) => {
        const stored = localStorage.getItem(`news_${cat}`);
        if (stored) {
          const items = JSON.parse(stored);
          all = [...all, ...items];
        }
      });

      setAllNews(
        all.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    } catch (error) {
      console.error("Error loading news:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = (id, category) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    
    try {
      const stored = localStorage.getItem(`news_${category}`);
      if (stored) {
        const items = JSON.parse(stored).filter((item) => item.id !== id);
        localStorage.setItem(`news_${category}`, JSON.stringify(items));
        loadAllNews();
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Failed to delete article");
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      telecom: "bg-blue-100 text-blue-800",
      internet: "bg-purple-100 text-purple-800",
      business: "bg-amber-100 text-amber-800",
      "social-media": "bg-pink-100 text-pink-800",
      cybersecurity: "bg-red-100 text-red-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const totalArticles = allNews.length;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage all your news articles</p>
        </div>
        <Link
          href="/admin/create"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Create Article
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Total Articles</p>
            <p className="text-5xl font-bold mt-2">{totalArticles}</p>
          </div>
          <FileText size={64} className="opacity-20" />
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {[
          { name: "Telecom", key: "telecom", icon: "📡" },
          { name: "Internet", key: "internet", icon: "🌐" },
          { name: "Business", key: "business", icon: "💼" },
          { name: "Social Media", key: "social-media", icon: "📱" },
          { name: "Cybersecurity", key: "cybersecurity", icon: "🔒" }
        ].map((cat) => {
          const count = allNews.filter((n) => n.category === cat.key).length;
          return (
            <Link
              key={cat.key}
              href={`/admin/${cat.key}`}
              className="bg-white p-5 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs text-gray-500">View All →</span>
              </div>
              <p className="text-gray-600 text-sm font-medium">{cat.name}</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{count}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent News */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
          {allNews.length > 10 && (
            <span className="text-sm text-gray-600">
              Showing 10 of {allNews.length}
            </span>
          )}
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading articles...</p>
          </div>
        ) : allNews.length === 0 ? (
          <div className="p-12 text-center text-gray-600">
            <FileText size={64} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-2">No articles yet</p>
            <p className="text-sm mb-6">Start by creating your first news article</p>
            <Link
              href="/admin/create"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Plus size={20} />
              Create First Article
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {allNews.slice(0, 10).map((news) => (
              <div
                key={news.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2 hover:text-green-600 transition-colors">
                      {news.title}
                    </h3>
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(
                          news.category
                        )}`}
                      >
                        {news.category
                          .split("-")
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </span>
                      <span className="text-sm text-gray-600">
                        📅 {new Date(news.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      {news.author && (
                        <span className="text-sm text-gray-600">
                          ✍️ {news.author}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 line-clamp-2 text-sm">
                      {news.content}
                    </p>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <Link
                      href={`/news/${news.category}/${news.id}`}
                      className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                      title="View"
                    >
                      <Eye size={18} className="text-gray-600 group-hover:text-blue-600" />
                    </Link>
                    <button
                      onClick={() => deleteNews(news.id, news.category)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                      title="Delete"
                    >
                      <Trash2 size={18} className="text-gray-600 group-hover:text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View All Link */}
      {allNews.length > 10 && (
        <div className="mt-6 text-center">
          <button className="text-green-600 hover:text-green-700 font-medium">
            View all {allNews.length} articles →
          </button>
        </div>
      )}
    </div>
  );
}