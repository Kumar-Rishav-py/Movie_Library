import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router";

const SignInUp = () => {
  const [inEmail, setInEmail] = useState('');
  const [upEmail, setUpEmail] = useState('');
  const [inPass, setInPass] = useState("");
  const [upPass, setUpPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  
  useEffect(() => {
    if (!firebase.user?.email) {
      navigate('/sign');
    } else {
      navigate('/');
    }
  }, [firebase, navigate]);

  const handleSignUp = () => {
    if (upPass !== confirmPass) {
      alert("Passwords do not match");
      return;
    }
    firebase.signupUserWithEmailAndPassword(upEmail, upPass);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {firebase.isLoaded ? (
        <div className="w-full max-w-md bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <div className="flex justify-center items-center py-8">
            <FaUserCircle className="text-6xl text-indigo-500" />
          </div>
          <div className="bg-white px-8 py-6">
            {signUp ? (
              <form>
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <div className="mb-4">
                  <label htmlFor="upemail" className="block text-gray-700 font-semibold">Email Address</label>
                  <input
                    id="upemail"
                    type="email"
                    value={upEmail}
                    onChange={(e) => setUpEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="uppassword" className="block text-gray-700 font-semibold">Password</label>
                  <input
                    id="uppassword"
                    type="password"
                    value={upPass}
                    onChange={(e) => setUpPass(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSignUp}
                  className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                  Sign Up
                </button>
              </form>
            ) : (
              <form>
                <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
                <div className="mb-4">
                  <label htmlFor="inemail" className="block text-gray-700 font-semibold">Email Address</label>
                  <input
                    id="inemail"
                    type="email"
                    value={inEmail}
                    onChange={(e) => setInEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="inpassword" className="block text-gray-700 font-semibold">Password</label>
                  <input
                    id="inpassword"
                    type="password"
                    value={inPass}
                    onChange={(e) => setInPass(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => firebase.signinUserWithEmailAndPassword(inEmail, inPass)}
                  className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                  Sign In
                </button>
              </form>
            )}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setSignUp(!signUp)}
                className="text-sm text-indigo-500 hover:underline focus:outline-none"
              >
                {signUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-5xl mx-auto">Loading...</p>
      )}
    </div>
  );
};

export default SignInUp;
