"use client"

import NewsForm from "@/components/admin/newsform"

export default function InternetAdmin() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Internet</h1>
      <p className="text-gray-600 mb-8">Post news about internet providers</p>
      <NewsForm category="internet" subcategories={["WorldLink", "Vianet", "Classic Tech", "DishHome Fibernet"]} />
    </div>
  )
}
