import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple, FaEyeSlash, FaEye } from 'react-icons/fa';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8">Log in to Voyantra</h1>
        
        <div className="space-y-4 mb-8">
          <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-full hover:bg-gray-50 transition duration-300">
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-full hover:bg-gray-50 transition duration-300">
            <FaFacebook size={24} className="text-blue-600" />
            <span>Continue with Facebook</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-full hover:bg-gray-50 transition duration-300">
            <FaApple size={24} />
            <span>Continue with Apple</span>
          </button>
        </div>
        
        <div className="my-6 text-center relative">
          <hr className="border-gray-300" />
          <span className="px-4 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">or</span>
        </div>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email or username
            </label>
            <input
              type="text"
              id="email"
              placeholder="Email or username"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
          
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-sky-500 focus:ring-sky-400 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
          
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 rounded-full font-semibold hover:bg-sky-600 transition duration-300"
          >
            Log In
          </button>
        </form>
        
        <p className="mt-4 text-center">
          <a href="#" className="text-sky-500 hover:underline">
            Forgot your password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;