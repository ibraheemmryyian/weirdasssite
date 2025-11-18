import { Zap, Shield, Truck, Sparkles } from 'lucide-react';

export function FeatureSection() {
  const features = [
    {
      icon: Zap,
      title: 'INSTANT TECH',
      description: 'Smart fabric technology that adapts to your environment'
    },
    {
      icon: Shield,
      title: 'QUANTUM SHIELD',
      description: 'Advanced protection with nano-coating treatment'
    },
    {
      icon: Truck,
      title: 'HYPER DELIVERY',
      description: 'Express shipping to anywhere in the universe'
    },
    {
      icon: Sparkles,
      title: 'LIMITLESS STYLE',
      description: 'Designs that transcend conventional boundaries'
    }
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm
                         border border-white/10 transition-all duration-500
                         hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]
                         transform hover:scale-105 hover:-translate-y-2
                         animate-[fadeIn_0.6s_ease-out_both]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-blue-500/0
                              group-hover:from-cyan-400/10 group-hover:to-blue-500/10
                              rounded-2xl transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500
                                flex items-center justify-center mb-6
                                transform transition-all duration-500
                                group-hover:scale-110 group-hover:rotate-12
                                shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
