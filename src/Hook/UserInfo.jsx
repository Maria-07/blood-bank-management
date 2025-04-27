import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useGetProfileQuery } from "../redux/features/auth/userApi";

const UserInfo = () => {
  const { userId } = useAuth();
  const [user, setUser] = useState();
  //! get all My Books
  const {
    data: userProfile,
    isLoading,
    isError,
  } = useGetProfileQuery(userId, {
    skip: !userId, // Prevent API call if userId is undefined or null
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setUser(userProfile?.data);
    }
  }, [userProfile, isLoading, isError]);

  return user;
};

export default UserInfo;
