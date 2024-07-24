import { getServerSession } from "next-auth";

import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Member = async () => {
	const session = await getServerSession(options);

	if (!session) {
		redirect("/api/auth/signin?callbackUrl=/Member");
	}

	return (
		<div>
			<h1>Member Server Session</h1>
			<p>{session?.user?.email}</p>
			<p>{session?.user?.role}</p>
			{JSON.stringify(session)}
			<br/>
			<br/>
			<br/>
			{JSON.stringify(options)}
			{console.log(session)}
		</div>
	);
};

export default Member;
