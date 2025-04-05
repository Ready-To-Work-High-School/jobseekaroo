
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0772863e2eac4b3cb10aaec607ec1185',
  appName: 'JobsForHS',
  webDir: 'dist',
  server: {
    url: 'https://0772863e-2eac-4b3c-b10a-aec607ec1185.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  // This allows mixed content (HTTP resources on HTTPS sites)
  // which might be needed for development
  android: {
    allowMixedContent: true
  },
  // Add haptic feedback and native transitions
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FFFFFF",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    }
  }
};

export default config;
