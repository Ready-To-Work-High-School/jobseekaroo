
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { user, userProfile } = useAuth();
  
  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          {userProfile && (
            <div>
              <p>First Name: {userProfile.first_name}</p>
              <p>Last Name: {userProfile.last_name}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
