"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";

export const ResetPasswordForm = () => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    async function reset() {
        if (!email) {
            setError('Missing email');
            return;
        }

        try {
            const { data } = await axios.post('/api/reset-password-email', {
                email
            });
            console.log(data, 'datad');
            // TODO show success message and then redirect to login
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {error}
            <button onClick={reset}>Reset</button>
        </div>
    );
};