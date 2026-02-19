import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginSectionProps {
  initialMode?: 'login' | 'signup';
  onModeChange?: (mode: 'login' | 'signup') => void;
  onLoginSuccess?: () => void;
}

type AuthMode = 'login' | 'signup';
type SignupType = 'individual' | 'organisation';

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

const LoginSection: React.FC<LoginSectionProps> = ({ initialMode = 'login', onModeChange, onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [signupType, setSignupType] = useState<SignupType>('individual');
  
  const [formData, setFormData] = useState<Record<string, string>>({
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    country: '',
    contactNumber: '',
    confirmPassword: '',
    companyName: '',
    companyWebsite: '',
    purpose: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMode(initialMode);
    setErrors({});
  }, [initialMode]);

  const toggleMode = (newMode: AuthMode) => {
    setMode(newMode);
    setErrors({});
    if (onModeChange) onModeChange(newMode);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mode === 'login') {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.password) newErrors.password = 'Password is required';
    } else {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.username) newErrors.username = 'Username is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.country) newErrors.country = 'Please select a country';
      if (!formData.contactNumber) newErrors.contactNumber = 'Contact number is required';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Minimum 8 characters';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (signupType === 'organisation') {
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (onLoginSuccess) onLoginSuccess();
    }
  };

  const getInputClasses = (name: string) => {
    const hasError = !!errors[name];
    return `w-full bg-transparent border-b ${hasError ? 'border-red-500' : 'border-gray-200'} px-0 py-2.5 text-sm focus:outline-none ${hasError ? 'focus:border-red-600' : 'focus:border-[#d4af37]'} transition-colors duration-300 placeholder:text-gray-300 appearance-none`;
  };

  const labelClasses = "block text-[9px] tracking-[0.25em] text-black uppercase font-black mb-1.5";
  const errorMsgClasses = "text-[9px] text-red-500 mt-1 uppercase font-bold tracking-wider";

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920" 
          alt="Himalayan Mist" 
          className="w-full h-full object-cover brightness-[0.9] saturate-[0.8] opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6]/80 via-transparent to-[#faf9f6]/80"></div>
      </div>

      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className={`relative z-10 w-full ${mode === 'login' ? 'max-w-md' : 'max-w-4xl'} bg-white p-8 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-gray-100 rounded-sm`}
      >
        <div className="text-center mb-12">
          <motion.div layout className="w-14 h-14 gold-gradient rounded-sm mx-auto mb-8 flex items-center justify-center p-1 shadow-xl">
             <img src="https://picsum.photos/seed/znpal-auth/100" className="w-full h-full object-cover grayscale brightness-125" alt="Logo" />
          </motion.div>
          <motion.h2 layout className="text-4xl md:text-5xl serif italic mb-3 text-black">
            {mode === 'login' ? 'Welcome Back' : 'Join the Legacy'}
          </motion.h2>
          <motion.p layout className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-black">
            {mode === 'login' ? 'Log in to the inner circle' : 'Create your ZNPAL profile'}
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'signup' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex mb-12 border border-gray-100 p-1 bg-gray-50/30 rounded-sm overflow-hidden"
            >
              <button 
                type="button"
                onClick={() => setSignupType('individual')}
                className={`flex-1 py-4 text-[10px] tracking-[0.3em] font-black uppercase transition-all duration-500 rounded-sm ${signupType === 'individual' ? 'bg-black text-white shadow-xl translate-z-0' : 'text-gray-400 hover:text-black hover:bg-gray-100/50'}`}
              >
                Individual
              </button>
              <button 
                type="button"
                onClick={() => setSignupType('organisation')}
                className={`flex-1 py-4 text-[10px] tracking-[0.3em] font-black uppercase transition-all duration-500 rounded-sm ${signupType === 'organisation' ? 'bg-black text-white shadow-xl translate-z-0' : 'text-gray-400 hover:text-black hover:bg-gray-100/50'}`}
              >
                Organisation
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <motion.div 
                key="login"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div>
                  <label className={labelClasses}>Email Address</label>
                  <input 
                    name="email"
                    type="email" 
                    className={getInputClasses('email')} 
                    placeholder="HELLO@ZNPAL.COM"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className={errorMsgClasses}>{errors.email}</p>}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className={labelClasses}>Password</label>
                    <button type="button" className="text-[9px] tracking-widest text-[#d4af37] uppercase font-bold hover:opacity-70 transition-opacity">Forgot?</button>
                  </div>
                  <input 
                    name="password"
                    type="password" 
                    className={getInputClasses('password')} 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <p className={errorMsgClasses}>{errors.password}</p>}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="signup"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8"
              >
                <div className="lg:col-span-1">
                  <label className={labelClasses}>First Name<span className="text-red-500 ml-1">*</span></label>
                  <input 
                    name="firstName"
                    type="text" 
                    className={getInputClasses('firstName')} 
                    placeholder="SARAH" 
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <p className={errorMsgClasses}>{errors.firstName}</p>}
                </div>
                <div className="lg:col-span-1">
                  <label className={labelClasses}>Middle Name</label>
                  <input 
                    name="middleName"
                    type="text" 
                    className={getInputClasses('middleName')} 
                    placeholder="M." 
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                </div>
                <div className="lg:col-span-1">
                  <label className={labelClasses}>Last Name<span className="text-red-500 ml-1">*</span></label>
                  <input 
                    name="lastName"
                    type="text" 
                    className={getInputClasses('lastName')} 
                    placeholder="CHEN" 
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <p className={errorMsgClasses}>{errors.lastName}</p>}
                </div>

                <div>
                  <label className={labelClasses}>Username<span className="text-red-500 ml-1">*</span></label>
                  <input 
                    name="username"
                    type="text" 
                    className={getInputClasses('username')} 
                    placeholder="SARAH_MOUNTAIN" 
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && <p className={errorMsgClasses}>{errors.username}</p>}
                </div>
                <div>
                  <label className={labelClasses}>Email Address<span className="text-red-500 ml-1">*</span></label>
                  <input 
                    name="email"
                    type="email" 
                    className={getInputClasses('email')} 
                    placeholder="SARAH@ZNPAL.COM" 
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className={errorMsgClasses}>{errors.email}</p>}
                </div>

                <AnimatePresence mode="popLayout">
                  {signupType === 'organisation' && (
                    <>
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <label className={labelClasses}>Company Name<span className="text-red-500 ml-1">*</span></label>
                        <input 
                          name="companyName"
                          type="text" 
                          className={getInputClasses('companyName')} 
                          placeholder="HIMALAYAN FABRICS LTD" 
                          value={formData.companyName}
                          onChange={handleChange}
                        />
                        {errors.companyName && <p className={errorMsgClasses}>{errors.companyName}</p>}
                      </motion.div>
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <label className={labelClasses}>Company Website</label>
                        <input 
                          name="companyWebsite"
                          type="url" 
                          className={getInputClasses('companyWebsite')} 
                          placeholder="WWW.FABRICS.NP" 
                          value={formData.companyWebsite}
                          onChange={handleChange}
                        />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                <div>
                  <label className={labelClasses}>Country<span className="text-red-500 ml-1">*</span></label>
                  <div className="relative">
                    <select 
                      name="country"
                      className={`${getInputClasses('country')} cursor-pointer bg-transparent py-2 pr-8`}
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="" className="bg-white">SELECT COUNTRY</option>
                      {COUNTRIES.map(country => (
                        <option key={country} value={country} className="bg-white">
                          {country.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                  {errors.country && <p className={errorMsgClasses}>{errors.country}</p>}
                </div>
                <div>
                  <label className={labelClasses}>Contact Number<span className="text-red-500 ml-1">*</span></label>
                  <input 
                    name="contactNumber"
                    type="tel" 
                    className={getInputClasses('contactNumber')} 
                    placeholder="+977 980-0000000" 
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                  {errors.contactNumber && <p className={errorMsgClasses}>{errors.contactNumber}</p>}
                </div>

                <div>
                  <label className={labelClasses}>Password<span className="text-red-500 ml-1">*</span></label>
                  <input 
                    name="password"
                    type="password" 
                    className={getInputClasses('password')} 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <p className={errorMsgClasses}>{errors.password}</p>}
                </div>
                <div>
                  <label className={labelClasses}>Confirm Password<span className="text-red-500 ml-1">*</span></label>
                  <input 
                    name="confirmPassword"
                    type="password" 
                    className={getInputClasses('confirmPassword')} 
                    placeholder="••••••••" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <p className={errorMsgClasses}>{errors.confirmPassword}</p>}
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <label className={labelClasses}>Purpose of Register</label>
                  <textarea 
                    name="purpose"
                    className={`${getInputClasses('purpose')} resize-none min-h-[100px] mt-2 border p-4 border-gray-100 bg-gray-50/10`} 
                    placeholder="Tell us about your interest in ZNPAL fibers..."
                    value={formData.purpose}
                    onChange={handleChange}
                  />
                  <p className="mt-4 text-[9px] text-red-500 italic tracking-widest uppercase">* Required fields</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-6 text-center">
            <button 
              type="submit"
              className="w-full py-5 gold-gradient text-black text-[11px] font-black tracking-[0.5em] uppercase hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[0_20px_40px_rgba(212,175,55,0.2)] mb-8"
            >
              {mode === 'login' ? 'LOG IN TO ACCOUNT' : 'CREATE MEMBER PROFILE'}
            </button>
            
            <motion.div 
              layout
              className="text-xs tracking-[0.15em] flex items-center justify-center space-x-2"
            >
              <span className="text-gray-400 font-medium uppercase text-[9px]">
                {mode === 'login' ? 'New to the heritage?' : 'Already have a profile?'}
              </span>
              <button 
                type="button"
                onClick={() => toggleMode(mode === 'login' ? 'signup' : 'login')}
                className="text-[#d4af37] font-bold tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
              >
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default LoginSection;