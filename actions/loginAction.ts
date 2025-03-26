"use server"
import { generateToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from 'next/headers'
import { NextApiResponse } from "next";

export const login = async (formData: FormData) => {
    try {
        const username = formData.get("username") as string
        const password = formData.get("password") as string
        const user = await prisma.user.findFirst({
            where: {
                username,
                password
            }
        })

        if (!user)
            throw new Error("Invalid username or password")

        const token = await generateToken(user.id, user.username);
        const cookieStore = await cookies()

        cookieStore.set({
            name: 'access_token',
            value: token,
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        })

        return { success: true, user }

    } catch (error: any) {
        throw new Error(error.message)

    }




}