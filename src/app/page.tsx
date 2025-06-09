import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/30 blur-[100px] animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/20 blur-[100px] animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-500/20 blur-[100px] animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center">
        <div className="space-y-6 max-w-4xl">
          {/* Logo/Brand */}
          <div className="mb-12 animate-fade-in-down">
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                PropAl
              </span>
              <span className="text-white">
                {' '}AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
              Revolutionizing how small and medium businesses interact with their customers through intelligent voice AI.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Multilingual', desc: 'Support for multiple Indian languages' },
              { title: 'Intelligent', desc: 'Advanced AI-powered conversations' },
              { title: 'Scalable', desc: 'Grows with your business needs' },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="group p-6 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in-up">
            <Link
              href="/signup"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-in-out"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 rounded-full animate-gradient-xy group-hover:scale-105 transition-transform"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 rounded-full opacity-50 blur-md animate-gradient-xy"></span>
              <span className="relative flex items-center space-x-2">
                <span className="text-lg">Get Started</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
