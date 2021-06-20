import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User from "../../../../src/models/User";
import bcrypt from "bcrypt";

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
                const user = await User.find({
                    username: credentials.username,
                });

                if (user.length > 0) {
                    const result = bcrypt.compareSync(
                        credentials.password,
                        user[0].password
                    );
                    if (result) {
                        return user[0];
                    }
                } else {
                    throw "/login";
                    // If you return null or false then the credentials will be rejected
                    return null;
                    // You can also Reject this callback with an Error or with a URL:
                    // throw new Error('error message') // Redirect to error page
                    // throw '/path/to/redirect'        // Redirect to a URL
                }
            },
        }),
    ],
    callbacks: {
        session: async (session, user) => {
            const userdata = await User.findById(user.sub);
            session.user.id = userdata._id;
            session.user.name = userdata.name;
            session.user.username = userdata.username;
            session.user.role = userdata.role;

            return Promise.resolve(session);
        },
    },
    pages: {
        signIn: "/login",
    },
};

export default function (req, res) {
    return NextAuth(req, res, options);
}
