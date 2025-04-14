import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "./fireBase";
import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const loginWithGoogle = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google login error", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const loginWithFacebook = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      await signInWithPopup(auth, facebookProvider);
    } catch (error) {
      console.error("Facebook login error", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="p-6 space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="spinner"></div> {/* Spinner during loading */}
        </div>
      ) : (
        <>
          <button
            onClick={loginWithGoogle}
            className="bg-red-500 text-white p-2 rounded"
          >
            Sign in with Google
          </button>
          <button
            onClick={loginWithFacebook}
            className="bg-blue-600 text-white p-2 rounded"
          >
            Sign in with Facebook
          </button>
        </>
      )}
    </div>
  );
}
