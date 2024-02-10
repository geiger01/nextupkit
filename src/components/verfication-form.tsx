"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export const VerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    async function verifyToken() {
        if (!token) {
            setError('Missing token');
            return;
        }

        try {
            const { data } = await axios.post('/api/verify-email', {
                token
            });
            console.log(data, 'datda');
            // TODO redirect to login
        } catch (e) {

        }
    }

    useEffect(() => {
        verifyToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div>
            verigying...
        </div>
    );
};