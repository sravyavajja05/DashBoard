import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const avatarColors = [
    { letter: 'P', bg: '#E879F9' },
    { letter: 'V', bg: '#818CF8' },
    { letter: 'D', bg: '#F472B6' },
    { letter: 'K', bg: '#34D399' },
    { letter: 'S', bg: '#FBBF24' },
    { letter: 'H', bg: '#60A5FA' },
];

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleManualLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        const mockUser = {
            name: email ? email.split('@')[0] : 'User',
            email: email || 'user@example.com',
            picture: null,
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
        setTimeout(() => {
            setLoading(false);
            navigate('/dashboard');
        }, 400);
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoading(true);
            try {
                const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const googleUser = {
                    name: res.data.name,
                    email: res.data.email,
                    picture: res.data.picture,
                };
                localStorage.setItem('user', JSON.stringify(googleUser));
                navigate('/dashboard');
            } catch (err) {
                console.error('Failed to fetch Google user info', err);
                localStorage.setItem('user', JSON.stringify({ name: 'Google User', email: 'user@gmail.com' }));
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        },
        onError: () => {
            console.log('Google Login Failed');
        },
    });

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8F9FA]">
            {/* ── Left Black Panel — Exactly ONE "Board." centered vertically and horizontally ── */}
            <div className="lg:w-[45%] bg-[#000000] p-8 lg:p-16 flex items-center justify-center relative overflow-hidden min-h-[200px] lg:min-h-screen">
                <h1 className="text-white text-5xl lg:text-6xl font-extrabold tracking-tight select-none">
                    Board.
                </h1>
            </div>

            {/* ── Right Form Section ── */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-[400px] space-y-6">
                    {/* Header */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Sign In</h2>
                        <p className="text-xs text-gray-500 mt-1">Sign in to your account</p>
                    </div>

                    {/* Avatar Cluster */}
                    <div className="flex items-center gap-2 py-1">
                        <div className="flex -space-x-2 overflow-hidden">
                            {avatarColors.map((av, i) => (
                                <div
                                    key={i}
                                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white flex items-center justify-center text-white text-xs font-bold shadow-sm"
                                    style={{ backgroundColor: av.bg }}
                                >
                                    {av.letter}
                                </div>
                            ))}
                        </div>
                        <span className="text-xs font-medium text-gray-400 ml-1">+1.2k users online</span>
                    </div>

                    {/* Google Sign In Button */}
                    <button
                        onClick={() => googleLogin()}
                        type="button"
                        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-xl border border-gray-200 shadow-sm transition-all duration-200 text-sm"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        Sign in with Google
                    </button>

                    <div className="relative flex items-center justify-center">
                        <div className="border-t border-gray-200 w-full" />
                        <span className="bg-[#F8F9FA] px-3 text-[11px] text-gray-400 font-medium absolute">or sign in with email</span>
                    </div>

                    {/* Sign In Form */}
                    <form onSubmit={handleManualLogin} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="johndoe@gmail.com"
                                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-gray-900/10 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-gray-900/10 transition-all"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <a href="#" className="text-xs text-blue-600 hover:underline font-medium">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm shadow-sm flex items-center justify-center gap-2"
                        >
                            {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-500">
                        Don&apos;t have an account?{' '}
                        <a href="#" className="text-blue-600 font-semibold hover:underline">Register here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
