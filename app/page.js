import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Admin News Portal
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your complete news management system
        </p>
        <Link 
          href="/admin" 
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg"
        >
          Go to Dashboard →
        </Link>
      </div>
    </div>
  );
}