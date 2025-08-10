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
    <section id="testimonials" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600">Real feedback from teams using OmniInfra</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 animate-fade-in hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
