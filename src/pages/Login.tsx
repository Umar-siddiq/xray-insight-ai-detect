
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Github, Mail, Lock, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { showAuthAlert } from "@/components/AuthAlert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password);
      showAuthAlert({
        type: "success",
        message: "Login successful! Redirecting to dashboard...",
      });
    } catch (error) {
      showAuthAlert({
        type: "error",
        message: error instanceof Error ? error.message : "Login failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    showAuthAlert({
      type: "info",
      message: `${provider} login is not implemented yet.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-medical-100/20 flex flex-col">
      <div className="py-6 text-center">
        <h1 className="text-xl font-bold text-primary">XRay Insight AI</h1>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold">Welcome to XRay Insight AI</h1>
            <p className="text-muted-foreground">Sign in to XRay Insight AI</p>
          </div>

          <Card className="w-full">
            <form onSubmit={handleSubmit}>
              <CardHeader className="space-y-1 pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => {
                        setRememberMe(checked === true);
                      }}
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  <LogIn className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>

                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-muted" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    type="button" 
                    className="w-full"
                    onClick={() => handleSocialLogin("Google")}
                    disabled={isSubmitting}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018 0-3.878 3.132-7.018 7-7.018 1.89 0 3.47.697 4.682 1.829l-1.974 1.978C13.092 8.005 12 7.527 12.14 7.527c-2.458 0-4.454 2.033-4.454 4.473 0 2.437 1.996 4.471 4.454 4.471 2.218 0 3.284-1.434 3.425-2.437h-3.425v-2.568h5.804c.057.348.093.698.093 1.092.001 3.872-2.594 5.96-5.897 5.96z"
                        fill="currentColor"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button 
                    variant="outline" 
                    type="button" 
                    className="w-full"
                    onClick={() => handleSocialLogin("GitHub")}
                    disabled={isSubmitting}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} XRay Insight AI. All rights reserved.
      </div>
    </div>
  );
};

export default Login;
