
/**
 * Records successful verification in the session storage
 */
export const markIdentityAsVerified = (): void => {
  sessionStorage.setItem('identityVerified', 'true');
};

/**
 * Clears verification status - useful for forcing re-verification
 */
export const clearVerificationStatus = (): void => {
  sessionStorage.removeItem('identityVerified');
};

/**
 * Checks if the user has verified their identity in this session
 */
export const isIdentityVerified = (): boolean => {
  return sessionStorage.getItem('identityVerified') === 'true';
};
