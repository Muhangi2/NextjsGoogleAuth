import User from "@/models/user";
import { connecttodb } from "@/lib/mongodb";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
console.log({
  mongodb: process.env.MONGODB_URL,
});
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("user", user);
      console.log("account", account);

      //lets check if the provider is google
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          await connecttodb();

          const userExists = await User.findOne({ email });

          if (!userExists) {
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, email }),
            });

            if (res.ok) {
              return user;
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      return user;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
