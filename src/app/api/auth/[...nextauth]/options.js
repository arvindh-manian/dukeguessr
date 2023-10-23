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
                    placeholder: "bolgar_the_destroyer",
                },
                password: {
                    label: "Password:",
                    type: "password",
                },
            },
            async authorize(credentials) {
                const user = await getUser(credentials.name);
                if (user && user.password === credentials.password) {
                    return user;
                }

                return null;
            },
        }),
    ],
};
