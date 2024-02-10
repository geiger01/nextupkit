"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";

export const VerificationForm = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    async function verifyToken() {
        if (!token) {
            setError('Missing token');
            return;
        }

        try {
            await axios.post('/api/verify-email', {
                token
            });
            // TODO show success message and then redirect to login
            router.replace('/sign-in');
        } catch (e) {
            if ((e instanceof AxiosError)) {
                setError(e.response?.data?.message);
            }
        }
    }

    useEffect(() => {
        verifyToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div>
            verigying...

            error: {error}
        </div>
    );
};