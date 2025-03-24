
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface SocialAuthButtonsProps {
  onAppleSignIn: () => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  isAppleLoading: boolean;
  isGoogleLoading: boolean;
  isFormLoading: boolean;
}

const SocialAuthButtons = ({
  onAppleSignIn,
  onGoogleSignIn,
  isAppleLoading,
  isGoogleLoading,
  isFormLoading
}: SocialAuthButtonsProps) => {
  const { toast } = useToast();
  
  const handleGoogleSignIn = async () => {
    try {
      console.log('Initiating Google sign-in from SocialAuthButtons');
      await onGoogleSignIn();
    } catch (error: any) {
      console.error('Google sign-in error in component:', error);
      toast({
        title: "Google Sign-In Error",
        description: error?.message || "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleAppleSignIn = async () => {
    try {
      await onAppleSignIn();
    } catch (error: any) {
      console.error('Apple sign-in error in component:', error);
      toast({
        title: "Apple Sign-In Error",
        description: error?.message || "Could not sign in with Apple. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading || isFormLoading}
        className="w-full flex justify-center items-center gap-2 transition-all border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        {isGoogleLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> 
            Connecting...
          </span>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
              <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00"/>
              <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z" fill="#4CAF50"/>
              <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
            </svg>
            <span className="ml-2">Sign in with Google</span>
          </>
        )}
      </Button>
      
      <Button
        variant="outline"
        onClick={handleAppleSignIn}
        disabled={isAppleLoading || isFormLoading}
        className="w-full flex justify-center items-center gap-2 transition-all border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        {isAppleLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> 
            Connecting...
          </span>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5014 1C16.5432 1 16.585 1 16.627 1C16.7884 2.17614 16.3327 3.02065 15.8232 3.61139C15.3123 4.20482 14.587 4.74434 13.57 4.6572C13.4382 3.5207 13.9169 2.66545 14.4246 2.0841C14.8871 1.54604 15.7332 1.09276 16.5014 1Z" />
              <path d="M20.8271 17.4371C20.8304 17.5156 20.8337 17.5929 20.8368 17.6719C20.622 18.5427 20.2261 19.2829 19.7218 19.9256C19.2479 20.5301 18.7169 21.134 17.7857 21.134C16.9178 21.134 16.3295 20.6488 15.4615 20.6311C14.5448 20.6135 14.0134 21.0815 13.1487 21.1344C13.0701 21.1388 12.9917 21.134 12.9117 21.1216C12.9095 21.0981 12.9074 21.0747 12.9052 21.0513C12.9246 20.2922 13.1605 19.5444 13.5531 18.9411C14.0824 18.1402 14.8526 17.5264 15.7613 17.4354C16.5926 17.3503 17.2695 17.8731 18.035 17.8938C18.035 17.8938 18.1121 17.897 18.2213 17.8849C18.8068 17.83 19.3741 17.4646 19.7886 16.9524C20.1469 16.505 20.4163 15.9326 20.5501 15.1851C20.5631 15.1148 20.5748 15.0444 20.5865 14.9741C20.7072 14.2736 20.7651 13.5588 20.758 12.8484C20.751 12.1564 20.6819 11.4609 20.5505 10.7778C20.2853 9.38662 19.7805 8.08776 19.086 6.9518C18.3652 5.77103 17.4336 4.77554 16.3563 4.0449C15.8156 3.68791 15.245 3.40611 14.6493 3.20958C14.6376 3.20522 14.6258 3.20087 14.6142 3.19655C14.0409 3.00567 13.4429 2.90458 12.8384 2.90458C12.4069 2.90458 11.9797 2.95454 11.5619 3.0527C11.5192 3.06249 11.4769 3.07271 11.4345 3.08337C10.8329 3.24227 10.261 3.52166 9.7523 3.90518C8.73533 4.66066 7.85932 5.78591 7.32124 7.2062C7.26747 7.35359 7.21704 7.50241 7.16996 7.65294C6.88334 8.51566 6.7417 9.38552 6.7417 10.2576C6.7417 10.916 6.82619 11.5524 6.97788 12.1555C7.01144 12.2933 7.04854 12.4308 7.08829 12.5681C7.1318 12.7199 7.17871 12.8713 7.22809 13.0213C7.56033 14.0039 8.08764 14.8598 8.77405 15.5365C9.47223 16.2248 10.3472 16.753 11.3432 17.0243C11.4193 17.0458 11.4962 17.0661 11.5738 17.0853C11.9895 17.1821 12.4207 17.233 12.8627 17.233C13.0385 17.233 13.2123 17.2232 13.3835 17.204C13.4333 17.2002 13.4831 17.1959 13.5329 17.1911C13.7306 17.1608 13.9233 17.1205 14.1113 17.0706C14.1531 17.0604 14.1946 17.0499 14.2366 17.0394" />
            </svg>
            <span className="ml-2">Sign in with Apple</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default SocialAuthButtons;
