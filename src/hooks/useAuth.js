import { useEffect, useState } from "react"
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { auth, provider } from "../config/firebase"

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(true)
      currentUser ? setUser(currentUser) : setUser(null)
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async() => {
    setError(null)
    try {
      await signInWithPopup(auth, provider)
    } catch (e) {
      setError('Fehler beim Anmelden:', e.message)
    } finally {
      setLoading(false)
    }
  }

  const logout = async() => {
    setError(null)
    try {
      await signOut(auth)
      console.log('Erfolgreich abgemeldet')
    } catch (e) {
      setError('Fehler beim Abmelden:', e.message)
    } finally {
      setLoading(false)
    }
  }


  return { user, loading, login, logout, error };
};

export default useAuth;
