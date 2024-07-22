import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
	providers : [
		GitHubProvider({
			profile(profile){
				console.log("Profile Github: ", profile)

				let userRole = "Github User"
				if(profile?.email == "josedeveloper94@gmail.com"){
					userRole = "Admin"
				}

				return {
					...profile,
					role: userRole
				}
			},

			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),

		GoogleProvider({
			profile(profile){
				console.log("Profile Google: ", profile)


				return {
					...profile,
					id: profile.sub,
					role: userRole
				}
			},

			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET
		})
	],

	callback: {
		async jwt({token, user}){
			if (user) token.role = user.role
			return token
		},

		async session({session, token}){
			if(session?.user) session.user.role = token.role 
			return session
		}
	}
}