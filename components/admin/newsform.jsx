"use client";

import { useState, useEffect } from "react";
import { Check, AlertCircle } from "lucide-react";

export default function NewsForm({ category, subcategories = [] }) {
  // ---- Hooks must stay at the top (order must never change) ----
  const [isMounted, setIsMounted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subcategory: subcategories[0] || "",
    content: "",
  });

  const [articles, setArticles] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Mark client mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load articles only AFTER mounted (because localStorage)
  useEffect(() => {
    if (!isMounted) return;

    try {
      const stored = localStorage.getItem(`news_${category}`);
      if (stored) {
        setArticles(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading articles:", error);
    }
  }, [isMounted, category]);

  // ---- If not mounted, return lightweight placeholder (same DOM always) ----
  if (!isMounted) {
    return (
      <div className="max-w-3xl">
        <div className="bg-white rounded-lg border border-gray-200 p-8 opacity-0">
          Loading...
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const newArticle = {
      id: Date.now().toString(),
      title: formData.title,
      category,
      subcategory: formData.subcategory,
      content: formData.content,
      date: new Date().toISOString(),
    };

    try {
      const stored = localStorage.getItem(`news_${category}`);
      const currentArticles = stored ? JSON.parse(stored) : [];
      const updated = [newArticle, ...currentArticles];
      localStorage.setItem(`news_${category}`, JSON.stringify(updated));

      setArticles(updated);
      setFormData({
        title: "",
        subcategory: subcategories[0] || "",
        content: "",
      });

      setMessage("Article posted successfully!");
      setMessageType("success");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving article:", error);
      setMessage("Error posting article");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Post New Article
        </h2>

        {message && (
          <div
            className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
              messageType === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {messageType === "success" ? (
              <Check size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter article title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subcategory
            </label>
            <select
              value={formData.subcategory}
              onChange={(e) =>
                setFormData({ ...formData, subcategory: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {subcategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Write your article content here..."
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Post Article
          </button>
        </form>
      </div>
    </div>
  );
}
