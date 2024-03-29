import { createContext, useEffect, useState } from "react";
import CONSTANTS from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const SessionContext = createContext();

export default function SessionProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      setIsLoading(true)
     
        const user = await fetch(CONSTANTS.USER_URL, {
          method: "GET",
          credentials: "include",
        });
        const userData = await user.json();
        if (userData?.status === "error") throw userData;

        setCurrentUser({ ...userData.payload });
        setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false)
    }
  };

  const login = async (data) => {
    try {
      const resp = await fetch(CONSTANTS.LOGIN_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await resp.json();
      if (result.status === "error") throw result;
      await getUserData();
      navigate("/products");
      toast.success(result.message);
    } catch (error) {
      console.error(error.message);
      throw error
    }
  };

  const logout = async () => {
    try {
      const resp = await fetch(CONSTANTS.LOGOUT_URL, {
        method: "GET",
        credentials: "include",
      });
      const result = await resp.json();
      if (result.status === "error") throw result;
      setCurrentUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      setIsAuthenticated(false);
      console.error(error.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <SessionContext.Provider
      value={{ currentUser, logout, login, isAuthenticated }}
    >
      {!isLoading && children}
    </SessionContext.Provider>
  );
}
