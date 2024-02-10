"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";

export const NewPasswordForm = () => {
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    async function submitPassword() {
        if (!token) {
            setError('Missing token');
            return;
        }

        try {
            const { data } = await axios.post('/api/reset-password', {
                token,
                password
            });
            // TODO show success message and then redirect to login
            console.log(data, 'data');
            router.replace('/sign-in');
        } catch (e) {
            if ((e instanceof AxiosError)) {
                setError(e.response?.data?.message);
            }
        }
    }

    return (
        <div>
            <input
                type="email"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error}
            <button onClick={submitPassword}>Reset</button>
        </div>
    );
};