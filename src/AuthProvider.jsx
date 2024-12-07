import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import auth from "./fire.init"; 
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores the current logged-in user
  const [loading, setLoading] = useState(true); // Tracks loading state

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state
      setLoading(false); // Set loading to false after determining the auth state
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Log out the user
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Reset the user state after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Update the user's profile
  const updateUser = async (newName, newPhotoURL) => {
    if (!auth.currentUser) {
      console.error("No authenticated user to update.");
      return;
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: newName,
        photoURL: newPhotoURL,
      });

      setUser((prevUser) => ({
        ...prevUser,
        displayName: newName,
        photoURL: newPhotoURL,
      }));
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center py-[300px]">
         
    
<div className="flex-col gap-4 w-full flex items-center justify-center">
  <div
    className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
  >
    <div
      className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
    ></div>
  </div>
</div>


      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
