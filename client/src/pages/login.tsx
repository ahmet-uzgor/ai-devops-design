import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FloatingElements } from "@/components/ui/floating-elements";
import { Github, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { useState } from "react";

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function Login() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    // Form submission will be handled later
    console.log("Login form submitted:", data);
    toast({
      title: "Welcome back!",
      description: "You have successfully signed in to OmniInfra.",
    });
  };

  const handleGithubLogin = () => {
    console.log("GitHub login clicked");
    toast({
      title: "GitHub login",
      description: "GitHub authentication will be implemented soon.",
    });
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    toast({
      title: "Google login",
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
          <div className="max-w-lg mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6 animate-fade-in mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200">
                <span className="text-sm font-medium text-blue-700">
                  Welcome Back
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Sign In to
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  OmniInfra
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Continue managing your AI-powered DevOps infrastructure
              </p>
            </div>

            <Card className="shadow-2xl border-gray-100">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Sign In</CardTitle>
                <CardDescription className="text-gray-600">
                  Access your OmniInfra dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                {/* Social Login Buttons */}
                <div className="space-y-4 mb-6">
                  <Button
                    onClick={handleGithubLogin}
                    variant="outline"
                    className="w-full h-12 border-gray-300 hover:border-gray-400 transition-colors"
                    data-testid="button-login-github"
                  >
                    <Github className="mr-3 h-5 w-5" />
                    Continue with GitHub
                  </Button>
                  
                  <Button
                    onClick={handleGoogleLogin}
                    variant="outline"
                    className="w-full h-12 border-gray-300 hover:border-gray-400 transition-colors"
                    data-testid="button-login-google"
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

                {/* Email Login Form */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
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
                          <div className="flex items-center justify-between">
                            <FormLabel>Password</FormLabel>
                            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                              Forgot password?
                            </Link>
                          </div>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <Input 
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password" 
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

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white h-12 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold border-0"
                      data-testid="button-login"
                    >
                      Sign In
                    </Button>
                  </form>
                </Form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                      Create one
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Features Preview */}
            <div className="mt-12 text-center space-y-4">
              <p className="text-sm text-gray-500">Trusted by teams worldwide</p>
              <div className="flex justify-center space-x-8 text-xs text-gray-400">
                <div>90% faster deployments</div>
                <div>75% fewer incidents</div>
                <div>12+ countries</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}