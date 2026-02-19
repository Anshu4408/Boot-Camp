'use client';
import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import ProfilePageHeader from '@/components/ProfilePageHeader';
import ProfileAvatarUpload from '@/components/ProfileAvatarUpload';
import EditProfileForm from '@/components/EditProfileForm';
import { useAuthToken } from '@/components/AuthTokenProvider';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
    const { token } = useAuthToken();
    const router = useRouter();
    const [userDetails, setUserDetails] = React.useState(null);

    // Check token and redirect if not authenticated
    React.useEffect(() => {
      if (!token) {
        router.push('/');
        return;
      }
    }, [token, router]);

    React.useEffect(() => {
      if (!token) return;
      
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched user data:', data);
            // Handle nested data structure
            const userData = data.data || data.user || data;
            setUserDetails(userData);
          
          } else {
            console.error('Failed to fetch user details');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserDetails();
    }, [token]);

    if (!token) {
      return null;
    }

    console.log('Profile page - userDetails state:', userDetails);

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
     
        {/* Content */}
        <div className="flex-1 overflow-hidden ">
          <div className="px-30 py-15 h-full flex flex-col justify-center items-start overflow-auto w-full">
           
                 <ProfilePageHeader />
          
           
            {/* Main Form Section */}
            <div className="w-full  bg-white rounded-lg p-20 shadow-sm my-4 border border-[#B9B9B9]">
            
              {/* <ProfileAvatarUpload /> */}
              <EditProfileForm userDetails={userDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
