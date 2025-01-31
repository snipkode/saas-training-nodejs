import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black`}>
      {/* Hero Section */}
      <section className="px-6 py-24 mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
            AI-Powered Solutions for Modern Business
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your workflow with cutting-edge artificial intelligence. Boost productivity and unlock new possibilities.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              Start Free Trial
            </button>
            <button className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Smart Automation",
                description: "Automate repetitive tasks with AI-powered workflows",
                icon: "🤖"
              },
              {
                title: "Deep Analytics",
                description: "Get actionable insights from your data",
                icon: "📊"
              },
              {
                title: "Real-time Processing",
                description: "Process and analyze data in real-time",
                icon: "⚡"
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "29",
                features: ["5,000 API calls", "Basic Analytics", "24/7 Support"]
              },
              {
                name: "Pro",
                price: "99",
                features: ["50,000 API calls", "Advanced Analytics", "Priority Support"]
              },
              {
                name: "Enterprise",
                price: "299",
                features: ["Unlimited API calls", "Custom Solutions", "Dedicated Support"]
              }
            ].map((plan, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <p className="text-4xl font-bold mb-6">${plan.price}<span className="text-lg text-gray-500">/mo</span></p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8">Join thousands of companies already using our AI solutions</p>
          <button className="px-8 py-3 rounded-full bg-white text-blue-600 hover:bg-gray-100 transition-colors">
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8">
          <div className="flex items-center gap-2">
            <Image
              src="/vercel.svg"
              alt="Logo"
              width={32}
              height={32}
              className="dark:invert"
            />
            <span className="font-bold">AI Solutions</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
