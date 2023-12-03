import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "@/utils/user";

export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Alex_Chao_Is_Cool",
                },
                password: {
                    label: "Password:",
                    type: "password",
                },
            },
            async authorize(credentials) {
                const user = await getUser(credentials.name);
                if (user && user.password === credentials.password) {
                    const retUser = {
                        name: user.username,
                        email: user.email,
                    };
                    return retUser;
                }

                return null;
            },
        }),
    ],
};
