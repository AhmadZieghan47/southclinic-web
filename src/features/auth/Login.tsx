/**
 * Login Page
 * Authentication form with Zod validation
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button, Card } from '../../design-system';
import { LogIn, Mail, Lock } from 'lucide-react';
import styles from './Auth.module.css';

// Zod validation schema
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Login data:', data);

    // Set fake auth token
    localStorage.setItem('auth-token', 'fake-jwt-token');

    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <Card>
          <div className={styles.authHeader}>
            <div className={styles.authLogo}>
              <LogIn size={40} />
            </div>
            <h1 className={styles.authTitle}>Welcome Back</h1>
            <p className={styles.authSubtitle}>Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
            <div className={styles.formField}>
              <label className={styles.label}>Email Address</label>
              <Input
                type="email"
                placeholder="john@example.com"
                leftElement={<Mail size={16} />}
                error={!!errors.email}
                {...register('email')}
              />
              {errors.email ? (
                <span className={styles.errorText}>{errors.email.message}</span>
              ) : null}
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                leftElement={<Lock size={16} />}
                error={!!errors.password}
                {...register('password')}
              />
              {errors.password ? (
                <span className={styles.errorText}>{errors.password.message}</span>
              ) : null}
            </div>

            <div className={styles.authOptions}>
              <div className={styles.checkbox}>
                <input type="checkbox" id="rememberMe" {...register('rememberMe')} />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <Link to="/forgot-password" className={styles.link}>
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className={styles.authFooter}>
              <p>
                Don't have an account?{' '}
                <Link to="/register" className={styles.link}>
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
