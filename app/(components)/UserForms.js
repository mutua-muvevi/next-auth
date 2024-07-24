"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const UserForms = () => {
	const router = useRouter();
	const [formData, setFormData] = useState({});
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;

		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		setErrorMessage("");

		const res = await fetch("/api/Users", {
			method: "Post",
			body: JSON.stringify({ formData }),
			"content-type": "application/json",
		});

		if (!res.ok) {
			const response = await res.json();
			setErrorMessage(response.message);
		} else {
			router.refresh();
			setFormData({});

			router.push("/");
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				method="post"
				className="flex flex-col gap-4 s-1/2"
			>
				<h1>Create New User</h1>

				<label>Fullname</label>
				<input
					id="name"
					name="name"
					onChange={handleChange}
					type="text"
					required={true}
					value={formData.name}
					className="m2 bg-slate-400 rounded-sm p-1"
				/>

				<label>Email</label>
				<input
					id="email"
					name="email"
					onChange={handleChange}
					type="email"
					required={true}
					value={formData.email}
					className="m2 bg-slate-400 rounded-sm p-1"
				/>

				<label>Password</label>
				<input
					id="password"
					name="password"
					onChange={handleChange}
					type="password"
					required={true}
					value={formData.password}
					className="m2 bg-slate-400 rounded-sm p-1"
				/>

				<input
					type="submit"
					value="Create User"
					className="bg-blue-300 hover:bg-blue-400 rounded-sm p-1 hover:cursor-pointer"
				/>
			</form>

			<p className="text-red-500">{errorMessage}</p>
		</>
	);
};

export default UserForms;
