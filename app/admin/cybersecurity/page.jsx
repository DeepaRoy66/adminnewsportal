"use client"

import NewsForm from "@/components/admin/newsform"

export default function CybersecurityAdmin() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Cybersecurity</h1>
      <p className="text-gray-600 mb-8">Post cybersecurity threats and security tips</p>
      <NewsForm category="cybersecurity" subcategories={["Threats & Attacks", "Security Tips", "Policy & Law"]} />
    </div>
  )
}
