"use client";

import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";

export default function NewsForm({ category, subcategories = [] }) {
  // ---------------- Hooks ----------------
  const [formData, setFormData] = useState({
    title: "",
    subcategory: subcategories[0] || "",
    content: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error

  // ---------------- Submit Handler ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      return;
    }

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          category,
          subcategory: formData.subcategory,
          content: formData.content,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Article posted successfully!");
        setMessageType("success");

        setFormData({
          title: "",
          subcategory: subcategories[0] || "",
          content: "",
        });
      } else {
        setMessage("Failed to post article");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Server error while posting article");
      setMessageType("error");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  // ---------------- UI ----------------
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
          {/* Title */}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subcategory
            </label>
            <select
              value={formData.subcategory}
              onChange={(e) =>
                setFormData({ ...formData, subcategory: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              {subcategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Content */}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Post Article
          </button>
        </form>
      </div>
    </div>
  );
}
