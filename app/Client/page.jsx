"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Client = () => {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			redirect("/api/auth/signin?callbackUrl=/Client");
		},
	})
	let fullsession = useSession({
		required: true,
		onUnauthenticated() {
			redirect("/api/auth/signin?callbackUrl=/Client");
		},})

	return (
		<div>
			<h1>Client Server Session</h1>
			<p>{session?.user?.email}</p>
			<p>{session?.user?.role}</p>
			<br/>
			<p>{JSON.stringify(session)}</p>
			<br/>
			<p>{JSON.stringify(fullsession)}</p>
		</div>
	);
};

export default Client;
