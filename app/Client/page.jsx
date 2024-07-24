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

	return (
		<div>
			<h1>Client Server Session</h1>
		</div>
	);
};

export default Client;
