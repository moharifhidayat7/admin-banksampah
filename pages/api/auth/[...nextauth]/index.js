import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/api/user/check`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
          }
        );
        const user = await result.json();

        if (result.status == 200 && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.user = user;
      }

      return token;
    },

    async session(session, token) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signin: "/login",
  },
};

export default function (req, res) {
  return NextAuth(req, res, options);
}
