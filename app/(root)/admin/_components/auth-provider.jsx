'use client'

import { auth } from "@/firebase.config"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  
  const [user, setUser] = useState(null)
  const [authLoaded, setAuthLoaded] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, _user => {
      setUser(_user)
      setAuthLoaded(true)
    })

    return () => unsub()
  }, [])

  const register = async (values) => {
    setAuthLoaded(true)
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
      console.log('Error creating account: ', error.message)
    } finally {
      setAuthLoaded(false)
    }

  }
  const login = async (values) => {
    setAuthLoaded(true) 
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password)

      if(!userCredential.user) {
        throw new Error('Something went wrong!. Please try again.')
      }
      console.log(userCredential);
      console.log('Logged in successfully!')
    } catch (error) {
      console.log('Error creating account: ', error.message)
    } 
  }

  const value = {
    user,
    authLoaded,
    register,
    login
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

