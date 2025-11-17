"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  LayoutDashboard,
  Zap,
  Wifi,
  Briefcase,
  Share2,
  Shield,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

// Category list
const categories = [
  { name: "Telecom", href: "/admin/telecom", icon: Zap, color: "text-blue-600" },
  { name: "Internet", href: "/admin/internet", icon: Wifi, color: "text-purple-600" },
  { name: "Business", href: "/admin/business", icon: Briefcase, color: "text-amber-600" },
  { name: "Social Media", href: "/admin/social-media", icon: Share2, color: "text-pink-600" },
  { name: "Cybersecurity", href: "/admin/cybersecurity", icon: Shield, color: "text-red-600" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
        onClick={() => setOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-full w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-b from-green-50 to-white flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              ITM ADMIN
            </h1>
            <p className="text-xs text-gray-600 mt-2 font-medium">News Management</p>
          </div>

          {/* Close Button for Mobile */}
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* Dashboard */}
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            onMouseEnter={() => setHoveredItem("dashboard")}
            onMouseLeave={() => setHoveredItem(null)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              isActive("/admin") && !pathname.includes("admin/")
                ? "bg-green-50 text-green-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <LayoutDashboard size={20} className="flex-shrink-0" />
            <span className="font-medium text-sm">Dashboard</span>

            {hoveredItem === "dashboard" &&
              isActive("/admin") &&
              !pathname.includes("admin/") && (
                <ChevronRight size={16} className="ml-auto text-green-600" />
              )}
          </Link>

          {/* Categories */}
          <div className="pt-6 pb-2">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
              Categories
            </p>
          </div>

          <div className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const active = isActive(category.href);

              return (
                <Link
                  key={category.name}
                  href={category.href}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHoveredItem(category.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    active
                      ? "bg-green-50 text-gray-900 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`p-2 rounded-md transition-colors ${
                      active ? "bg-green-100" : "bg-gray-100 group-hover:bg-green-50"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={`${category.color} transition-colors ${
                        !active && "group-hover:text-green-600"
                      }`}
                    />
                  </div>

                  <span
                    className={`text-sm font-medium flex-1 ${
                      active ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {category.name}
                  </span>

                  {hoveredItem === category.name && (
                    <ChevronRight
                      size={16}
                      className={`text-gray-400 ${active && "text-green-600"}`}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <div className="px-4 py-2 rounded-lg bg-red-50 text-sm text-gray-600 text-center">
            <p className="font-medium">Admin Panel</p>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 font-medium text-sm transition-colors duration-200 group">
            <LogOut size={18} className="group-hover:scale-110 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
