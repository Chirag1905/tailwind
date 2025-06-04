'use client'

import { refreshTokenSuccess, signOutSuccess } from "@/Redux/features/auth/authSlice";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const useLogout = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, tokenExpiry, refreshTokenExpiry } = useSelector(state => state.auth);

    const checkTokenStatus = useCallback(() => {
        if (!isAuthenticated) return;
        
        const now = Date.now();
        const isAccessTokenExpired = now > tokenExpiry;
        const isRefreshTokenExpired = now > refreshTokenExpiry;

        if (isAccessTokenExpired) {
            if (!isRefreshTokenExpired) {
                dispatch(refreshTokenSuccess());
                toast.success("Session refreshed automatically");
            } else {
                dispatch(signOutSuccess());
                toast.success("Session expired - you've been logged out");
            }
        }
    }, [dispatch, isAuthenticated, tokenExpiry, refreshTokenExpiry]);

    useEffect(() => {
        // Initial check when component mounts
        checkTokenStatus();

        // Set up interval only if authenticated
        if (isAuthenticated) {
            const intervalId = setInterval(checkTokenStatus, 5000);
            return () => clearInterval(intervalId);
        }
    }, [checkTokenStatus, isAuthenticated]);
};