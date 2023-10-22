import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "@/utils/user";

export const options = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "bolgar_the_destroyer",
                },
                password: {
                    label: "Password:",
                    type: "password",
                },
            },
            async authorize(credentials) {
                const user = await getUser(credentials.username);
                if (user && user.password === credentials.password) {
                    return user;
                }

                return null;
            },
        }),
    ],
};
