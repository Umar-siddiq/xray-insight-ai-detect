
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-xl font-bold text-primary">XRay Insight AI</div>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link to="/upload" className="text-sm font-medium transition-colors hover:text-primary">
            Upload X-ray
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link to="/login">Login</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
