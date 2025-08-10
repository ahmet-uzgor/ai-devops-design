import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FloatingElements } from "@/components/ui/floating-elements";
import { Github, Mail, User, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { useState } from "react";

const signupFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupFormSchema>;

export default function Signup() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupFormData) => {
    // Form submission will be handled later
    console.log("Signup form submitted:", data);
    toast({
      title: "Account created successfully!",
      description: "Welcome to OmniInfra. Please check your email to verify your account.",
    });
  };

  const handleGithubSignup = () => {
    console.log("GitHub signup clicked");
    toast({
      title: "GitHub signup",
      description: "GitHub authentication will be implemented soon.",
    });
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
    toast({
      title: "Google signup",
      description: "Google authentication will be implemented soon.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 pt-32 pb-20 overflow-hidden relative">
          <FloatingElements />
          
          {/* Left Side Visual Elements */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 w-64">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="text-sm font-medium text-gray-700">Deployment Status</div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">90% Faster</div>
                <div className="text-sm text-gray-600">Average deployment time reduced from hours to minutes</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 w-64">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <div className="text-sm font-medium text-gray-700">AI Monitoring</div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">24/7 Active</div>
                <div className="text-sm text-gray-600">Intelligent monitoring prevents 75% of incidents</div>
              </div>
            </div>
          </div>

          {/* Right Side Visual Elements */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 w-64">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <div className="text-sm font-medium text-gray-700">Global Reach</div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">12+ Countries</div>
                <div className="text-sm text-gray-600">Teams worldwide trust OmniInfra</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 w-64">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <div className="text-sm font-medium text-gray-700">Security Score</div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">99.9% Uptime</div>
                <div className="text-sm text-gray-600">Enterprise-grade security and reliability</div>
              </div>
            </div>
          </div>

          <div className="max-w-lg mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6 animate-fade-in mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200">
                <span className="text-sm font-medium text-blue-700">
                  Join OmniInfra
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Start Your
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  DevOps Journey
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Create your account and deploy production-ready infrastructure in minutes
              </p>
            </div>

            <Card className="shadow-2xl border-gray-100">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
                <CardDescription className="text-gray-600">
                  Choose your preferred signup method
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                {/* Social Signup Buttons */}
                <div className="space-y-4 mb-6">
                  <Button
                    onClick={handleGithubSignup}
                    variant="outline"
                    className="w-full h-12 border-gray-300 hover:border-gray-400 transition-colors"
                    data-testid="button-signup-github"
                  >
                    <Github className="mr-3 h-5 w-5" />
                    Continue with GitHub
                  </Button>
                  
                  <Button
                    onClick={handleGoogleSignup}
                    variant="outline"
                    className="w-full h-12 border-gray-300 hover:border-gray-400 transition-colors"
                    data-testid="button-signup-google"
                  >
                    <Mail className="mr-3 h-5 w-5" />
                    Continue with Google
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with email</span>
                  </div>
                </div>

                {/* Email Signup Form */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <Input 
                                placeholder="John Smith" 
                                {...field} 
                                data-testid="input-fullname"
                                className="h-12 pl-10"
                              />
                            </div>
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
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <Input 
                                type="email" 
                                placeholder="john@company.com" 
                                {...field} 
                                data-testid="input-email"
                                className="h-12 pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <Input 
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password" 
                                {...field} 
                                data-testid="input-password"
                                className="h-12 pl-10 pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                                data-testid="button-toggle-password"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <Eye className="h-4 w-4 text-gray-400" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <Input 
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password" 
                                {...field} 
                                data-testid="input-confirm-password"
                                className="h-12 pl-10 pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                data-testid="button-toggle-confirm-password"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <Eye className="h-4 w-4 text-gray-400" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white h-12 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold border-0"
                      data-testid="button-signup"
                    >
                      Create Account
                    </Button>
                  </form>
                </Form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                      Sign in
                    </Link>
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}