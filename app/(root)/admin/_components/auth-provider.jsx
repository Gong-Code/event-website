'use client'

import { auth, db } from "@/firebase.config"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false)
  
   // Check if there is a logged in user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, _user => {
      setUser(_user)
      setAuthLoaded(true)
    })

    return () => unsub()
  }, [])

   // Check if the logged in user is an admin
   useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().isAdmin);
        }
      };
      fetchUser();
    }
  }, [user]);
  

  const register = async (values) => {
    const toastId = toast.loading('Creating account...')

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)

      if(!userCredential.user) {
        throw new Error('Something went wrong!. Please try again.')
      }
      console.log(userCredential);

      await updateProfile(userCredential.user, {
        displayName: `${values.firstName} ${values.lastName}`
      }) 
      
      setUser(userCredential.user)

      toast.success('Account created successfully',  { id: toastId })

    } catch (error) {
      console.log(error.message);
      console.log(error.code);
      const message = error.code.split('/')[1].replace(/-/g, ' ')
      toast.error(message || error.message, { id: toastId })
    } 

  }

  
  const login = async (values) => {
    const toastId = toast.loading('Signing in...')
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password)

      if(!userCredential.user) {
        throw new Error('Something went wrong!. Please try again.')
      }
      console.log(userCredential);
      toast.success('Logged in successfully',  { id: toastId })

    } catch (error) {
      console.log(error.message);
      const message = error.code.split('/')[1].replace(/-/g, ' ')
      toast.error(message || error.message, { id: toastId })
    } 
  }


  const value = {
    user,
    isAdmin,
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

