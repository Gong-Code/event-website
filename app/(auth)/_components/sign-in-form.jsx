"use client"
 
import { useAuth } from "@/app/(root)/admin/_components/auth-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 

 
const formSchema = z.object({
  email: z.string().email({message: "You need to enter a valid email"}),
  password: z.string().min(6, { message: 'The password must be at least 6 characters long'}),
  
})


const SignInForm = () => {

  const { login } = useAuth()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""     
    },
  })
 
  
  function onSubmit(values) {
    
    
    login(values)
   
  }
 


  return (
    <div className="space-y-8 p-4 border rounded-md max-w-lg mx-auto my-10">
      <form  onSubmit={form.handleSubmit(onSubmit)} >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input type="email" {...form.register("email")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {form.formState.errors.email && <p className="text-red-500 text-xs italic">{form.formState.errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input type="password" {...form.register("password")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {form.formState.errors.password && <p className="text-red-500 text-xs italic">{form.formState.errors.password.message}</p>}
        </div>

        <button type="submit" className=" py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  )
}
export default SignInForm