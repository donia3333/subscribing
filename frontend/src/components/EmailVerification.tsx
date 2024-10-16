import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../api.ts';

const EmailVerification: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        const verify = async () => {
            if (token) {
                try {
                    const result = await verifyEmail(token);
                    alert(result.message);
                } catch (error) {
                    alert('Error verifying email');
                }
            }
        };

        verify();
    }, [token]);

    return <div>Email Verification in progress...</div>;
};

export default EmailVerification;
