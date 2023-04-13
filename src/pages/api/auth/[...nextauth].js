import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import UserServices from "@services/OnboardingServices";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "@context/UserContext";
import Cookies from "js-cookie";

// const {dispatch} = useContext(UserContext);
export default NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      type: "credentials",

      credentials: {
        registerEmail: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
        identifier: {
          label: "Username",
          type: "text",
        },
      },

      async authorize(credentials, req) {
        const { password, identifier } = credentials;
        const userData = await UserServices.userLogin({ password, identifier });

        // console.log('userData',userData);
        const cookieTimeOut = 5000;
        if (userData) {
          const user = {
            username: userData.user.username,
            email: userData.user.email,
          };
          Cookies.set("userInfo", JSON.stringify(userData.user), {
            expires: cookieTimeOut,
          });
          return userData;
        } else {
          throw new Error("Échec de connexion");
        }
      },
    }),
  ],

  pages: {
    signIn: "/",
  },

  secret: "looselipssinkships",

  callbacks: {
    jwt: ({ token, user }) => {
      // console.log('user-jwt:',user)

      if (user) {
        const u = user.user;
        const jwt = user.jwt;
        token = { ...token, ...u, jwt };
        // token.id = user.user.id;
        // token.name = user.user.username;
        // token.email = user.user.email;
        // token.jwt = user.jwt
      }
      return token;
    },
    session: ({ token, session }) => {
      if (token) {
        session = { ...session, ...token };
        // session.id = token.id;
        // session.username = token.email;
        // session.email = token.email;
        // session.jwt = token.jwt
      }
      return session;
    },
  },
});
