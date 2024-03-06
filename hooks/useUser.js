import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const MyUserContextProvider = (props) => {
    const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();

    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [subcription, setSubcription] = useState(null);

    const getUserDetails = () => {
        return supabase.from('users').select('*').single();
    }

    const getSubscription = () => {
        return supabase
            .from('subscriptions')
            .select('*, prices(*, products(*))')
            .in('status', ['trialing', 'active'])
            .single();
    }


    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subcription) {
            setIsLoadingData(true);

            Promise.allSettled([getUserDetails(), getSubscription()])
                .then((results) => {
                    const userDetailsPromise = results[0];
                    const userSubscriptionPromise = results[1];

                    if (userDetailsPromise.status === "fulfilled") {
                        setUserDetails(userDetailsPromise.value.data);
                    }
                    if (userSubscriptionPromise.status === "fulfilled") {
                        setSubcription(userSubscriptionPromise.value.data);
                    }

                    setIsLoadingData(false);
                })
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null);
            setSubcription(null);
        }
    }, [user, isLoadingUser]);

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subcription
    };

    return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a MyUserContextProvider');
    }
    return context;
}