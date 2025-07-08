import { useState, useEffect } from "react";
import { UserContext } from "./UserContext.js";
import { checkAuthStatus } from "../services/apis";

export const UserProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check authentication status on app initialization
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // Check if user is authenticated via cookies
                const response = await checkAuthStatus();
                if (response && response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                // User is not authenticated, which is fine
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, isLoading}} >
            {children}
        </UserContext.Provider>
    )
}