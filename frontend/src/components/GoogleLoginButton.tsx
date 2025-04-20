import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const GoogleAuthButton = () => {
  const { signInWithGoogle, isLoading, error } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Google Sign-In Error:', err);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="flex items-center justify-center w-[25rem] px-4 py-2 text-black bg-white  rounded-md hover:bg-slate-200 disabled:opacity-50"
      >
        <img
          src="https://www.citypng.com/public/uploads/preview/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png"
          alt="Google Logo"
          className="w-5 h-5 mr-2"
        />
        {isLoading ? 'Signing in...' : 'Sign in with Google'}
      </button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default GoogleAuthButton;
