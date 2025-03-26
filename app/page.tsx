"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import bgPic from "../public/timeManagmentbgPic.png"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { login } from "@/actions/loginAction"
import { Loader, Loader2 } from "lucide-react"
import { useState } from "react"


const loginSchema = z.object({
  username: z.string().nonempty({
    message: "Username is required"
  }),
  password: z.string().nonempty({
    message: "Password is required"
  })
})

const HomePage = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })
  const [isloading, setIsLoading] = useState(false)
  const router = useRouter();


  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const formData = new FormData();
    formData.append("username", data.username)
    formData.append("password", data.password)

    try {
      setIsLoading(true)
      const result = await login(formData)

      if (result.success) {
        toast.success("Login successfully")
        router.push(`/dashboard/${result.user.id}`)
        setIsLoading(true)
      }

    }
    catch (error: any) {
      toast.error(error.message || "Login Error")
    }
  }


  return (
    <main className='w-full h-screen flex flex-row  justify-center items-center align-middle gap-20' >
      <div className="w-full bg-sushi/60 h-full p-10">
        <Image src={bgPic} alt="bg" width={1000} height={1000} />
      </div>

      <div className="w-full h-full p-10 flex flex-col justify-center gap-8">
        <h1 className="text-4xl font-bold "> <span className="text-sushi">Tele
        </span>  <span className="text-curious-blue">
            Task</span>  Manager</h1>
        <p className="text-xl  font-medium ">Please log in to continue</p>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} method="POST" className="space-y-8 border border-l-sushi  border-r-curious-blue rounded-md shadow-md p-8 ">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-4 w-3/4">
                  <FormLabel className="font-light text-md">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" className="p-3 h-[2.5rem] border border-black/70  important" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-4 w-3/4">
                  <FormLabel className="font-light text-md">Password</FormLabel>
                  <Input placeholder="Your password" className="p-3 h-[2.5rem] border border-black/70  important" {...field} />
                  <FormControl>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isloading} className="bg-sushi hover:bg-curious-blue">
              {
                isloading ?
                  <Loader2 className="p-4" /> : <p>Log in</p>
              }</Button>
          </form>
        </Form>
      </div>

    </main>
  )
}

export default HomePage