'use client'

import { auth } from "@/firebase.config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { createContext, useContext, useState } from "react"

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false)

  const register = async (values) => {
    setIsLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)

      if(!userCredential.user) {
        throw new Error('Something went wrong!. Please try again.')
      }
      console.log(userCredential);

      await updateProfile(userCredential.user, {
        displayName: `${values.firstName} ${values.lastName}`
      }) 
      

      console.log('Account created successfully!')

    } catch (error) {
      console.log('Error creating account: ', error)
    } finally {
      setIsLoading(false)
    }

  }
  console.log(isLoading);
  const value = {
    register,
    isLoading
  }

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthContextProvider')
  return context
}

