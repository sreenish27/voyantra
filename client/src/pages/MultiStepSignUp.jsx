import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    password: '',
    name: '',
    day: '',
    month: '',
    year: '',
    gender: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const isPasswordValid = () => {
    return formData.password.length >= 10 &&
           /[A-Za-z]/.test(formData.password) &&
           /[0-9!@#$%^&*(),.?":{}|<>]/.test(formData.password);
  };

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i);
    }
    return years;
  };

  const StepHeader = ({ step, title }) => (
    <div className="mb-4">
      <h2 className="text-sm text-gray-500 mb-1">Step {step} of 3</h2>
      <h3 className="text-2xl font-bold">{title}</h3>
    </div>
  );

  const renderStep1 = () => (
    <div className="flex flex-col space-y-4">
      <StepHeader step={1} title="Create a password" />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <ul className="text-sm">
        <li className={formData.password.length >= 10 ? "text-green-500" : "text-red-500"}>
          10 characters
        </li>
        <li className={/[A-Za-z]/.test(formData.password) ? "text-green-500" : "text-red-500"}>
          1 letter
        </li>
        <li className={/[0-9!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? "text-green-500" : "text-red-500"}>
          1 number or special character
        </li>
      </ul>
      <button
        onClick={nextStep}
        disabled={!isPasswordValid()}
        className="bg-sky-500 text-white p-2 rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="flex flex-col space-y-4">
      <StepHeader step={2} title="Tell us about yourself" />
      
      <div>
        <label className="block font-bold">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter your name"
        />
        <p className="text-sm text-gray-500">This name will appear on your profile</p>
      </div>

      <div>
        <label className="block font-bold">Date of birth</label>
        <p className="text-sm text-gray-500">Why do we need your date of birth? <a href="#" className="text-sky-500">Learn more</a>.</p>
        <div className="flex space-x-2">
          <select
            name="day"
            value={formData.day}
            onChange={handleInputChange}
            className="w-1/4 p-2 border rounded"
          >
            <option value="">Day</option>
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select
            name="month"
            value={formData.month}
            onChange={handleInputChange}
            className="w-1/2 p-2 border rounded"
          >
            <option value="">Month</option>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
          <select
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="w-1/4 p-2 border rounded"
          >
            <option value="">Year</option>
            {getYears().map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block font-bold">Gender</label>
        <p className="text-sm text-gray-500">We use your gender to help personalize our content recommendations and ads for you.</p>
        <div className="flex flex-col space-y-2 mt-2">
          {['Man', 'Woman', 'Something else', 'Prefer not to say'].map((gender) => (
            <label key={gender} className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={formData.gender === gender}
                onChange={handleInputChange}
                className="form-radio text-sky-500"
              />
              <span>{gender}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={prevStep} className="bg-gray-300 text-black p-2 rounded">
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={!formData.name || !formData.day || !formData.month || !formData.year || !formData.gender}
          className="bg-sky-500 text-white p-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="flex flex-col space-y-4">
      <StepHeader step={3} title="Terms & Conditions" />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
        />
        <span>Share my registration data with Voyantra's content providers for marketing purposes.</span>
      </label>
      <p className="text-sm text-gray-700 mt-4">
        By clicking on sign-up, you agree to Voyantra's Terms and Conditions of Use.
      </p>
      <p className="text-sm text-gray-700">
        To learn more about how Voyantra collects, uses, shares and protects your personal data, please see Voyantra's Privacy Policy.
      </p>
      <div className="flex justify-between">
        <button onClick={prevStep} className="bg-gray-300 text-black p-2 rounded">
          Back
        </button>
        <button
          onClick={() => alert('Sign up successful!')}
          disabled={!formData.agreeToTerms}
          className="bg-sky-500 text-white p-2 rounded disabled:bg-gray-300"
        >
          Sign up
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 bg-gray-200 h-1 rounded-full">
        <div
          className="bg-sky-500 h-1 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
};

export default SignUp;