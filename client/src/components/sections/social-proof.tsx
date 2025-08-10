export default function SocialProof() {
  const partners = [
    "TechCorp",
    "InnovateLab", 
    "DevStudio",
    "CloudTech"
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-gray-600 font-medium mb-8">Trusted by innovative teams worldwide</p>
          
          {/* Partner Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="flex justify-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors">
                  {partner}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
