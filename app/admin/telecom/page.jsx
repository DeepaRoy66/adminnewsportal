"use client"

import { useState } from "react"
import NewsForm from "@/components/admin/newsform"

export default function TelecomAdmin() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Telecom</h1>
      <p className="text-gray-600 mb-8">Post news about telecom providers</p>
      <NewsForm category="telecom" subcategories={["NTC", "Ncell", "ISPs", "NTA"]} />
    </div>
  )
}
