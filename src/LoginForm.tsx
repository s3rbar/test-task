import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Популярна бібліотека іконок

function LoginForm(){
    const [email, setEmail] = useState('balamia@gmail.com');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Logging in with:', { email, password });
    };

    return (
        <>
           {/* <form action="#">
            
           </form> */}
           <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <h1 className="text-[28px] font-bold text-slate-800 mb-8">
                Login to your account
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                    <label className="block text-gray-500 font-medium" htmlFor="email">
                    Email
                    </label>
                    <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-300"
                    placeholder="Enter your email"
                    />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                    <label className="block text-gray-500 font-medium" htmlFor="password">
                        Password
                    </label>
                    <a href="#" className="text-blue-500 font-medium hover:underline text-sm">
                        Forgot ?
                    </a>
                    </div>
                    <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    </div>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-[#1d75f2] hover:bg-blue-600 text-white font-bold py-4 rounded-lg transition-colors shadow-md shadow-blue-200"
                >
                    Login now
                </button>
                </form>

                {/* Sign Up Link */}
                <div className="mt-8 text-center text-gray-400 font-medium">
                Don't Have An Account?{' '}
                <a href="#" className="text-blue-500 hover:underline">
                    Sign Up
                </a>
                </div>
            </div>
            </div>
        </>
    )
}

export default LoginForm