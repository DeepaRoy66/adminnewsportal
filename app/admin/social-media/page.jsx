"use client"

import NewsForm from "@/components/admin/newsform"

export default function SocialMediaAdmin() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Social Media</h1>
      <p className="text-gray-600 mb-8">Post updates about social media platforms</p>
      <NewsForm category="social-media" subcategories={["Facebook / Meta", "TikTok", "YouTube", "Trends & Viral"]} />
    </div>
  )
}
