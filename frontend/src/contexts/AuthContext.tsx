import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/config/firebase'; // Import the auth instance from firebase.ts

interface AuthContextType {
  session: { user: { email: string } } | null;
  currentUser: { email: string; uid: string } | null; // Renamed from user to currentUser
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<{ user: { email: string } } | null>(null);
  const [currentUser, setCurrentUser] = useState<{ email: string; uid: string } | null>(null); // Renamed from user
  const [isLoading, setIsLoading] = useState(true); // Start with loading state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setSession({ user: { email: firebaseUser.email! } });
        setCurrentUser({ email: firebaseUser.email!, uid: firebaseUser.uid }); // Updated to setCurrentUser
      } else {
        setSession(null);
        setCurrentUser(null); // Updated to setCurrentUser
      }
      setIsLoading(false); // Stop loading once the user state is determined
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setSession({ user: { email: user.email! } });
      setCurrentUser({ email: user.email!, uid: user.uid }); // Updated to setCurrentUser
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setSession({ user: { email: user.email! } });
      setCurrentUser({ email: user.email!, uid: user.uid }); // Updated to setCurrentUser
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setSession({ user: { email: user.email! } });
      setCurrentUser({ email: user.email!, uid: user.uid }); // Updated to setCurrentUser
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await firebaseSignOut(auth);
      setSession(null);
      setCurrentUser(null); // Updated to setCurrentUser
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        currentUser, // Updated to currentUser
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
