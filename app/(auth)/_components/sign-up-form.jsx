"use client"
 
import { useAuth } from "@/app/(root)/admin/_components/auth-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 

 
const formSchema = z.object({
  email: z.string().email({message: "You need to enter a valid email"}),
  firstName: z.string().min(1, { message: 'You need to enter a first name'}),
  lastName: z.string().min(1, { message: 'You need to enter a last name'}),
  password: z.string().min(6, { message: 'The password must be at least 6 characters long'}),
  confirmPassword: z.string(),
}).refine(values => {
  return values.password === values.confirmPassword
}, {
  message: 'Passwords must match',
  path: ['confirmPassword']
})


const SignUpForm = () => {

  const { register } = useAuth()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  })
 
  
  function onSubmit(values) {
    
    console.log(values)
    register(values)
   
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
          <label className="block text-sm font-bold mb-2">First Name</label>
          <input {...form.register("firstName")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {form.formState.errors.firstName && <p className="text-red-500 text-xs italic">{form.formState.errors.firstName.message}</p>}
        </div>

        <div className="mb-4">
          <label className="blocktext-sm font-bold mb-2">Last Name</label>
          <input {...form.register("lastName")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {form.formState.errors.lastName && <p className="text-red-500 text-xs italic">{form.formState.errors.lastName.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input type="password" {...form.register("password")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {form.formState.errors.password && <p className="text-red-500 text-xs italic">{form.formState.errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Confirm Password</label>
          <input type="password" {...form.register("confirmPassword")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {form.formState.errors.confirmPassword && <p className="text-red-500 text-xs italic">{form.formState.errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" className=" py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  )
}
export default SignUpForm