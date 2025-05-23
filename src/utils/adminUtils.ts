
export const isAdmin = (userProfile: any) => {
  return userProfile?.user_type === 'admin' || userProfile?.user_type === 'ceo';
};
