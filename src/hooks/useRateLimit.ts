
import { useState, useCallback, useRef } from 'react';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitState {
  count: number;
  resetTime: number;
}

export const useRateLimit = (config: RateLimitConfig) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [timeUntilReset, setTimeUntilReset] = useState(0);
  const stateRef = useRef<RateLimitState>({ count: 0, resetTime: Date.now() + config.windowMs });

  const checkRateLimit = useCallback(() => {
    const now = Date.now();
    const state = stateRef.current;

    // Reset window if expired
    if (now > state.resetTime) {
      state.count = 0;
      state.resetTime = now + config.windowMs;
      setIsBlocked(false);
      setTimeUntilReset(0);
    }

    // Check if over limit
    if (state.count >= config.maxRequests) {
      const timeLeft = Math.ceil((state.resetTime - now) / 1000);
      setIsBlocked(true);
      setTimeUntilReset(timeLeft);
      return false;
    }

    // Increment count
    state.count += 1;
    return true;
  }, [config.maxRequests, config.windowMs]);

  const getRemainingRequests = useCallback(() => {
    return Math.max(0, config.maxRequests - stateRef.current.count);
  }, [config.maxRequests]);

  return {
    checkRateLimit,
    isBlocked,
    timeUntilReset,
    getRemainingRequests
  };
};
