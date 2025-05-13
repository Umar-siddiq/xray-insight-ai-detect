
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Github, User, Mail, Lock, Building } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { showAuthAlert } from "@/components/AuthAlert";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      showAuthAlert({
        type: "error",
        message: "You must agree to the Terms of Service and Privacy Policy.",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      await register(fullName, workEmail, password, companyName);
      showAuthAlert({
        type: "success",
        message: "Account created successfully! Redirecting to dashboard...",
      });
    } catch (error) {
      showAuthAlert({
        type: "error",
        message: error instanceof Error ? error.message : "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    showAuthAlert({
      type: "info",
      message: `${provider} registration is not implemented yet.`,
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
            <h1 className="text-3xl font-semibold">Create Your XRay Insight AI Account</h1>
            <p className="text-muted-foreground">Start diagnosing with confidence</p>
          </div>

          <Card className="w-full">
            <form onSubmit={handleSubmit}>
              <CardHeader className="space-y-1 pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        className="pl-10"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="workEmail" className="text-sm font-medium">
                      Work Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="workEmail"
                        type="email"
                        placeholder="you@company.com"
                        className="pl-10"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="companyName" className="text-sm font-medium">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyName"
                        placeholder="Enter company name"
                        className="pl-10"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => {
                      setAgreeToTerms(checked === true);
                    }}
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to XRay Insight AI's{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Account..." : "Create Account"}
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
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Sign in
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

export default Register;
