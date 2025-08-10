import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FloatingElements } from "@/components/ui/floating-elements";
import { Mail, Phone, MapPin, Clock, MessageSquare, Users, Zap, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    // In a real application, this would send the data to your backend
    console.log("Contact form submitted:", data);
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="bg-white pt-32 pb-20 overflow-hidden relative">
          <FloatingElements />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                <span className="text-sm font-medium text-blue-700">
                  Get in Touch
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight max-w-4xl mx-auto">
                Let's Build the Future of
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  DevOps Together
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Ready to transform your infrastructure? Have questions about OmniInfra? We're here to help you get started with AI-powered DevOps automation.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8 mb-16">
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>Email Us</CardTitle>
                  <CardDescription>Get in touch via email</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-600 font-semibold">hello@omniinfra.com</p>
                  <p className="text-sm text-gray-600 mt-2">We typically respond within 4 hours</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>Call Us</CardTitle>
                  <CardDescription>Speak with our team</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-emerald-600 font-semibold">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-600 mt-2">Mon-Fri, 9AM-6PM PST</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>Visit Us</CardTitle>
                  <CardDescription>Our headquarters</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-600 font-semibold">San Francisco, CA</p>
                  <p className="text-sm text-gray-600 mt-2">123 Innovation Drive</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>Response Time</CardTitle>
                  <CardDescription>Quick support</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-600 font-semibold">&lt; 24 hours</p>
                  <p className="text-sm text-gray-600 mt-2">Average response time</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Send Us a Message
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Tell us about your project and how we can help accelerate your DevOps journey.
              </p>
            </div>

            <Card className="shadow-xl border-gray-100">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Smith" 
                                {...field} 
                                data-testid="input-name"
                                className="h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="john@company.com" 
                                {...field} 
                                data-testid="input-email"
                                className="h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your Company Name" 
                              {...field} 
                              data-testid="input-company"
                              className="h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-subject" className="h-12">
                                <SelectValue placeholder="Select a topic" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="demo">Request a Demo</SelectItem>
                              <SelectItem value="pricing">Pricing Information</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                              <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your project, current challenges, or how we can help..."
                              className="min-h-32 resize-none"
                              {...field}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg border-0"
                      data-testid="button-submit-contact"
                    >
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Contact Us */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Why Reach Out to Us?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're here to help you succeed with your DevOps transformation
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Consultation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get personalized advice from our DevOps experts who understand your challenges.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Solutions</h3>
                <p className="text-gray-600 leading-relaxed">
                  We'll help design a solution that fits your specific infrastructure needs.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Security Assessment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Learn how OmniInfra can enhance your security posture with AI-driven monitoring.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Implementation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get started quickly with our guided onboarding and migration support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-8">
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How quickly can I get started with OmniInfra?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Most teams can get started within 24 hours. Our onboarding process includes a personalized setup session and guided migration support to ensure a smooth transition.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Do you offer enterprise support?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, we provide dedicated enterprise support with 24/7 availability, dedicated success managers, and custom SLAs to meet your organization's needs.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Can OmniInfra integrate with our existing tools?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Absolutely. OmniInfra integrates with popular CI/CD tools, cloud providers, monitoring systems, and developer tools. We'll help you maintain your existing workflows while adding AI-powered automation.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">What kind of training do you provide?</h3>
                <p className="text-gray-600 leading-relaxed">
                  We offer comprehensive training including live workshops, documentation, video tutorials, and ongoing support to help your team master OmniInfra's capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}