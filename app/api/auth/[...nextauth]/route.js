import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";

const auth = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/`,
          {
            method: "POST",
            body: JSON.stringify({
              username: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          scope: "openid email profile",
        },
      },
      async profile(profile) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/onetap/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id_token: profile.id_token }),
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Google auth failed");
          }

          const userData = await response.json();
          return {
            ...profile,
            ...userData.user,
            accessToken: userData.access,
            refreshToken: userData.refresh,
          };
        } catch (error) {
          console.error("Google profile error:", error);
          return null; // This triggers the error page
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Handle Google Sign-In
      if (account?.provider === "google" && account.id_token) {
        try {
          const backendResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/onetap/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id_token: account.id_token }),
            }
          );

          if (backendResponse.ok) {
            const data = await backendResponse.json();
            token.accessToken = data.access;
            token.refreshToken = data.refresh;
            const decoded = jwt.decode(data.access);
            token = { ...token, ...decoded, ...data.user };
          }
        } catch (error) {
          console.error("Google authentication failed:", error);
        }
      }
      // Existing credentials handling
      else if (user) {
        token.accessToken = user.access;
        token.refreshToken = user.refresh;
        const decoded = jwt.decode(user.access);
        token = { ...token, ...decoded, ...user.user };
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, ...token };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { auth as GET, auth as POST };
