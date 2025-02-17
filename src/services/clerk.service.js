import axios from "axios";

const CLERK_API_KEY = process.env.CLERK_API_KEY;

export const verifyClerkSession = async (sessionToken) => {
    try {
        const response = await axios.get(`https://api.clerk.dev/v1/sessions/${sessionToken}`, {
            headers: { Authorization: `Bearer ${CLERK_API_KEY}` },
        });

        return response.data?.user_id || null;
    } catch (error) {
        console.error("❌ Clerk API Error:", error);
        return null;
    }
};
