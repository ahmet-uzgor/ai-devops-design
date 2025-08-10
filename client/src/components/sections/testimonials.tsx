import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      rating: 5,
      quote: "OmniInfra reduced our deployment time from hours to minutes. The AI-powered automation is incredible - it handles everything we used to do manually, and does it better.",
      author: "Sarah Anderson",
      role: "CTO, InnovateLab",
      initials: "SA"
    },
    {
      rating: 5,
      quote: "As a startup, we needed enterprise-level DevOps without the complexity. OmniInfra delivered exactly that. Now we focus on building features, not managing infrastructure.",
      author: "Marcus Chen",
      role: "Lead Developer, TechCorp",
      initials: "MC"
    }
  ];

  return (
    <section id="testimonials" className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">What Our Users Say</h2>
          <p className="text-xl text-gray-600 leading-relaxed">Real feedback from teams using OmniInfra</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 animate-fade-in group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-6 shadow-lg">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{testimonial.author}</div>
                  <div className="text-gray-600 font-medium">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
