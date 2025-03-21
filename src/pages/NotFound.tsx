
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
          <p className="text-2xl text-foreground mb-6">Oops! Page not found</p>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
