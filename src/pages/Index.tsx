
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    AI-Powered X-Ray Analysis
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Advanced diagnostic tools that help healthcare professionals detect diseases from X-ray images with precision and confidence.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link to="/upload">Upload Your X-Ray</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/dashboard">View Dashboard</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[600px]">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                    <div className="h-full w-full flex items-center justify-center bg-blue-50 text-blue-500">
                      <div className="text-center p-6">
                        <div className="text-4xl font-bold mb-2">XRay Insight AI</div>
                        <p className="text-gray-600">Diagnostic imaging analysis platform</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Features of XRay Insight AI
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides advanced tools for detecting patterns and anomalies in X-ray images.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <div className="rounded-full bg-primary/10 p-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                      <circle cx="12" cy="13" r="3"></circle>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Instant X-ray Analysis</h3>
                  <p className="text-sm text-gray-500">
                    Upload X-ray images and receive instant analysis with disease probabilities.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <div className="rounded-full bg-primary/10 p-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Comprehensive Reports</h3>
                  <p className="text-sm text-gray-500">
                    Detailed reports with visualizations and probability distribution.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <div className="rounded-full bg-primary/10 p-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                      <path d="M3 9h18"></path>
                      <path d="M9 21V9"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Dashboard Analytics</h3>
                  <p className="text-sm text-gray-500">
                    Track and manage all your analysis history in one secure location.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">© 2025 XRay Insight AI. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-sm text-gray-500 hover:underline">About</Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:underline">Privacy</Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:underline">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
