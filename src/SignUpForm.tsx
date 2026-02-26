import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function SignUpForm(){
    const [email, setEmail] = useState('balamia@gmail.com');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registering with:', { email, password });
    };

    return (
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
            <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                <h1 className="text-[28px] font-bold text-[#1e293b] mb-8">
                Create an account
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                    <label className="block text-slate-500 font-medium text-[15px]" htmlFor="email">
                    Email
                    </label>
                    <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-slate-700 placeholder-slate-300"
                    placeholder="Enter your email"
                    />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                    <label className="block text-slate-500 font-medium text-[15px]" htmlFor="password">
                        Password
                    </label>
                    <a href="#" className="text-[#3b82f6] font-medium hover:underline text-[14px]">
                        Forgot ?
                    </a>
                    </div>
                    <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-slate-700 placeholder-slate-400"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        {showPassword ? <EyeOff size={20} strokeWidth={1.5} /> : <Eye size={20} strokeWidth={1.5} />}
                    </button>
                    </div>
                </div>

                {/* Create Account Button */}
                <button
                    type="submit"
                    className="w-full bg-[#1d75f2] hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors shadow-sm"
                >
                    Create account
                </button>

                {/* Google Button */}
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 bg-[#e0efff] hover:bg-[#d0e5ff] text-[#1d75f2] font-bold py-4 rounded-xl transition-colors"
                >
                    <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAODSrOYhUv2R2FW1iCqccTM1TQyHoesAnbA&s" 
                    alt="Google" 
                    className="w-5 h-5"
                    />
                    Continue with Google
                </button>
                </form>

                {/* Log In Link */}
                <div className="mt-8 text-center text-slate-400 font-medium text-[15px]">
                Already Have An Account ?{' '}
                <a href="#" className="text-[#3b82f6] hover:underline">
                    Log In
                </a>
                </div>
            </div>
            </div>
        </>
    )
}

export default SignUpForm;