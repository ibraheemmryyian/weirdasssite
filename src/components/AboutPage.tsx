export function AboutPage() {
  return (
    <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            ABOUT ESCAPISM
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Contemporary fashion that blends timeless elegance with modern sophistication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Philosophy</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We believe fashion should be an expression of individuality, not a trend to follow.
              Our collections are designed to empower and inspire, creating pieces that stand the test of time.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every garment is crafted with attention to detail, using premium materials and sustainable practices
              to ensure both quality and environmental responsibility.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              From concept to creation, we work closely with skilled artisans and use innovative techniques
              to bring our vision to life. Each piece tells a story of craftsmanship and style.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We source materials globally, ensuring ethical production and supporting communities
              that share our commitment to excellence.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 rounded-xl bg-gray-900 text-white font-semibold
                       hover:bg-gray-800 transform transition-all duration-300
                       hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    </section>
  );
}
