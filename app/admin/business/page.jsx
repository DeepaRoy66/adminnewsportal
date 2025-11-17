"use client";

import NewsForm from "@/components/admin/newsform";

export default function BusinessAdmin() {
  return (
    <div className="px-4 md:px-8 py-6">
      {/* Heading */}
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
        Business
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 mb-8 text-sm md:text-base">
        Post business news and updates
      </p>

      {/* Form Area */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
        <NewsForm
          category="business"
          subcategories={["Markets", "Startups", "Economics", "Corporate"]}
        />
      </div>
    </div>
  );
}
