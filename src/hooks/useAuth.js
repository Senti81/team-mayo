import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(true)
      currentUser ? setUser(currentUser) : setUser(null)
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return { user, loading };
};

export default useAuth;
