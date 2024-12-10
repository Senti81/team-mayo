import { useCallback, useEffect, useState } from "react"
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { auth, provider } from "../config/firebase"

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAdmin, setAdmin] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setAdmin(currentUser.uid === process.env.REACT_APP_ADMIN_UID)
       } else {
        setError('User nicht angemeldet')
       }  
      setLoading(false)      
    });
    return () => unsubscribe()
  }, []);

  const login = useCallback(async() => {
    setLoading(true)
    setError(null)
    try {
      await signInWithPopup(auth, provider)
    } catch (e) {
      setError(`Fehler beim Anmelden: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async() => {
    setLoading(true)
    setError(null)
    try {
      await signOut(auth)
      console.log('Erfolgreich abgemeldet')
    } catch (e) {
      setError(`Fehler beim Abmelden: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  return { login, logout, user, isAdmin, loading, error }
}

export default useAuth
