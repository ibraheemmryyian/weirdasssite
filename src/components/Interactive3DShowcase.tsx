import { TextRevealHero } from './TextRevealHero';
import { InteractiveReveal } from './InteractiveReveal';
import heroImage from '../assets/images/hero.png';
import revealImage from '../assets/images/reveal.png';
import detailImage from '../assets/images/detail.png';

export function Interactive3DShowcase() {
  return (
    <section className="relative py-24 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <TextRevealHero
            text="LUXURY"
            revealImage={revealImage}
            className="mb-8"
          />
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Move your cursor over the text to reveal the artistry behind our collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Interactive Design Experience
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Hover over the images below to reveal the intricate details and craftsmanship
              that define our collection. Each piece tells a story of modern elegance.
            </p>
          </div>

          <div className="h-96 rounded-2xl overflow-hidden shadow-2xl">
            <InteractiveReveal
              baseImage={heroImage}
              revealImage={revealImage}
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="h-64 rounded-2xl overflow-hidden shadow-xl">
            <InteractiveReveal
              baseImage={detailImage}
              revealImage={heroImage}
              className="w-full h-full"
            />
          </div>
          <div className="h-64 rounded-2xl overflow-hidden shadow-xl">
            <InteractiveReveal
              baseImage={revealImage}
              revealImage={detailImage}
              className="w-full h-full"
            />
          </div>
          <div className="h-64 rounded-2xl overflow-hidden shadow-xl">
            <InteractiveReveal
              baseImage={heroImage}
              revealImage={detailImage}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
