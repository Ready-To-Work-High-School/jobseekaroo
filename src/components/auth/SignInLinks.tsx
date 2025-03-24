
import { Link } from "react-router-dom";

const SignInLinks = () => {
  return (
    <div className="text-center text-sm">
      <p>
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-primary font-medium hover:underline transition-colors">
          Sign Up
        </Link>
      </p>
      <p className="mt-2">
        <Link to="/forgot-password" className="text-muted-foreground hover:text-primary hover:underline transition-colors text-xs">
          Forgot your password?
        </Link>
      </p>
    </div>
  );
};

export default SignInLinks;
