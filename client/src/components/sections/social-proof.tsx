export default function SocialProof() {
  const partners = [
    "TechCorp",
    "InnovateLab", 
    "DevStudio",
    "CloudTech",
    "StartupOS",
    "ScaleFlow"
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-lg text-gray-600 font-medium mb-12">Trusted by innovative teams worldwide</p>
          
          {/* Partner Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="flex justify-center animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-xl font-bold text-gray-400 group-hover:text-gray-600 transition-all duration-300 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 group-hover:shadow-md group-hover:border-gray-200 group-hover:scale-105 relative overflow-hidden">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative z-10">{partner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
