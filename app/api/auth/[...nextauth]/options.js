import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/(models)/Users";
import brcypt from "bcrypt";

export const options = {
	providers: [
		GitHubProvider({
			profile(profile) {
				console.log("Profile Github: ", profile);

				let userRole = "Github User";
				if (profile?.email == "samstore637@gmail.com") {
					userRole = "Admin";
				}

				return {
					...profile,
					role: userRole,
				};
			},

			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),

		GoogleProvider({
			profile(profile) {
				console.log("Profile Google: ", profile);

				let userRole = "Google User";

				return {
					...profile,
					id: profile.sub,
					role: userRole,
				};
			},

			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),

		CredentialsProvider({
			name: "Credentials",

			credentials: {
				email: {
					label: "email",
					type: "text",
					placeholder: "your-email",
				},
				password: {
					label: "password",
					type: "password",
					placeholder: "your-password",
				},
			},

			async authorize(credentials) {
				try {
					//find user
					const foundUser = await User.findOne({
						email: credentials.email,
					})
						.lean()
						.exec();

					if (foundUser) {
						console.log("User Exists");

						const match = await brcypt.compare(
							credentials.password,
							foundUser.password
						);

						if (match) {
							console.log("Good pass");
							delete foundUser.password;

							foundUser["role"] = "Unverified Email"
							return foundUser
						}
					}
				} catch (error) {
					console.log(error);
				}

				return null;
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) token.role = user.role;
			return token;
		},

		async session({ session, token }) {
			if (session?.user) session.user.role = token.role;
			// console.log("Token", token)
			// console.log("Seszion", session)

			return session;
		},
	},
};
