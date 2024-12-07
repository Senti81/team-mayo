import { useCallback, useEffect, useState } from "react"
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { auth, provider } from "../config/firebase"

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    });
    return () => unsubscribe();
  }, []);

  const login = useCallback(async() => {
    setLoading(true)
    setError(null)
    try {
      await signInWithPopup(auth, provider)
    } catch (e) {
      setError('Fehler beim Anmelden:', e.message)
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
      setError('Fehler beim Abmelden:', e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { login, logout, user, loading, error }
}

export default useAuth
