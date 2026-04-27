import { User } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface SessionContextType {
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  currentUser: User | undefined;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  async function login(email: string) {
    const rawData = await AsyncStorage.getItem("onboard");
    const data = JSON.parse(rawData || "{}");

    if (data.email === email) {
      setCurrentUser({ name: data.name, email: data.email });
      return true;
    } else {
      return false;
    }
  }

  function logout() {
    setCurrentUser(undefined);
  }

  const value = {
    login,
    logout,
    isAuthenticated: currentUser !== undefined,
    currentUser,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => {
  const value = useContext(SessionContext);

  if (!value) {
    throw new Error("ta fazendo errado!!!");
  }

  return value;
};
