import { NextResponse } from "next/server";
import User from "@/app/(models)/Users";

import bcrypt from "bcrypt";

export async function POST(request) {
	try {
		const body = await request.json();
		const userData = body.formData;

		//check if data exists
		if (!userData?.email || !userData?.name || !userData?.password) {
			return NextResponse.json(
				{ message: "Fill all fields" },
				{ status: 400 }
			);
		}

		//handle duplicate
		const duplicate = await User.findOne({ email: userData.email })
			.lean()
			.exec();

		if (duplicate) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 409 }
			);
		}

		const hashPassword = await bcrypt.hash(userData.password, 10);

		userData.password = hashPassword;

		await User.create(userData);
		return NextResponse.json({ message: "User created successfully " }, { status: 201 });

	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Error", error }, { status: 500 });
	}
}
