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
        console.log("Starting credentials authorization...");
        console.log("Credentials received:", {
          email: credentials.email,
          password: credentials.password ? "***" : "missing",
        });

        const requestBody = {
          email: credentials.email,
          password: credentials.password,
        };

        console.log("Request body:", requestBody);
        console.log(
          "Request URL:",
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/`
        );

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/`,
            {
              method: "POST",
              body: JSON.stringify(requestBody),
              headers: { "Content-Type": "application/json" },
            }
          );

          const userData = await res.json();
          console.log("Full backend response:", {
            status: res.status,
            headers: Object.fromEntries(res.headers.entries()),
            body: userData,
          });

          if (res.ok && userData) {
            console.log("Login successful, returning user data");
            return {
              id: userData.user.pk,
              email: userData.user.email,
              name: `${userData.user.first_name} ${userData.user.last_name}`.trim(),
              access: userData.access,
              refresh: userData.refresh,
              user: userData.user,
            };
          }

          console.log("Login failed with status:", res.status);
          console.log("Error response:", userData);
          return null;
        } catch (error) {
          console.error("Authorization error details:", {
            message: error.message,
            stack: error.stack,
          });
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/onetap/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id_token: account.id_token }),
            }
          );

          if (!response.ok) {
            return false;
          }

          return true;
        } catch (error) {
          console.error("Google sign in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      console.log("JWT Callback - Starting");

      // Handle credentials login
      if (user && !account) {
        // This means it's a credentials login
        console.log("Processing credentials login");
        return {
          ...token,
          accessToken: user.access,
          refreshToken: user.refresh,
          id: user.id,
          email: user.email,
          name: user.name,
          user: user.user,
        };
      }

      // Handle Google login
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
            token.user = data.user;
          }
        } catch (error) {
          console.error("Google authentication failed:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback - Starting");
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        user: {
          ...session.user,
          id: token.id,
          ...token.user,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
});

export { auth as GET, auth as POST };
