"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
    return (
        <CacheProvider>
            <SessionProvider>
                <ChakraProvider>{children}</ChakraProvider>
            </SessionProvider>
        </CacheProvider>
    );
}
