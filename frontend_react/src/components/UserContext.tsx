import { ReactNode, createContext, useLayoutEffect, useState } from "react";



export const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  
  const getCurrentUser = async () => {
    try {
      setIsLoading(true);
      const apiUrl = import.meta.env.VITE_URL;
      const response = await fetch(`${apiUrl}/api/sessions/current`);
      const data = await response.json();
      if (response.status == 200) setCurrentUser(data.payload);
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  function updateCurrentUser() {
    getCurrentUser();
  }

  useLayoutEffect(() => {
    getCurrentUser();
  }, []);
  const contextValue: UserContextType = {
    currentUser,
    setCurrentUser,
    isLoading,
    updateCurrentUser,
  };
  return <UserContext.Provider value={contextValue}> {children} </UserContext.Provider>;
}
