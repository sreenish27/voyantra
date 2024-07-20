import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8">Sign up to start your voyage</h1>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@domain.com"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <Link
          to="/signup/multistep"
          >
          <div className="w-full bg-sky-500 mt-2 text-white py-3 rounded-full font-semibold hover:bg-sky-600 transition duration-300">
          
            <div className="ml-48">Next</div>
          
          </div>
          </Link>
          
        </div>
        
        <div className="my-6 text-center">
          <span className="px-4 bg-white relative z-10">or</span>
          <hr className="border-gray-300 absolute left-0 right-0 top-1/2 -z-10" />
        </div>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-full hover:bg-gray-50 transition duration-300">
            <FcGoogle size={24} />
            <span>Sign up with Google</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-full hover:bg-gray-50 transition duration-300">
            <FaFacebook size={24} className="text-blue-600" />
            <span>Sign up with Facebook</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-full hover:bg-gray-50 transition duration-300">
            <FaApple size={24} />
            <span>Sign up with Apple</span>
          </button>
        </div>
        
        <p className="mt-8 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-sky-500 hover:underline">
            Log in here
          </Link>
        </p>
        
      </div>
    </div>
  );
};

export default SignUp;