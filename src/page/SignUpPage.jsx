import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Code, Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react';
import { SignUpSchema } from '../schemas/signupSchema';
import { useAuthStore } from '../store/useAuthStore';
import AuthImagePattern from '../components/AuthImagePattern';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data) => {
    const success = await signup(data);
    if (success) {
      navigate('/verify-email');
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome </h1>
              <p className="text-base-content/60">Sign Up to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* fullname */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <User className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  {...register('fullname')}
                  className={`input input-bordered w-full pl-10 ${
                    errors.fullname ? 'input-error' : ''
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            {/* username */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Username</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <User className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  {...register('username')}
                  className={`input input-bordered w-full pl-10 ${
                    errors.username ? 'input-error' : ''
                  }`}
                  placeholder="johndoe123"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  className={`input input-bordered w-full pl-10 ${
                    errors.email ? 'input-error' : ''
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={`input input-bordered w-full pl-10 ${
                    errors.password ? 'input-error' : ''
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing Up...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          {/* Alpha Notice (conditionally rendered) */}
          {import.meta.env.VITE_SHOW_ALPHA_NOTICE === 'true' && (
            <div className="mb-4 p-3 rounded-lg bg-yellow-100/10 border border-yellow-300/20 text-yellow-300 text-sm text-center">
              <strong>Alpha Notice:</strong> CodeFlow is currently in alpha. User
              verification is manual and may take some time. You will be contacted
              once your account is approved; email notifications are not sent
              automatically.
            </div>
          )}

          {/* Footer */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{' '}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={'Welcome to CodeFlow!'}
        subtitle={
          'Sign up to access our platform and start using our services.'
        }
      />
    </div>
  );
};

export default SignUpPage;
