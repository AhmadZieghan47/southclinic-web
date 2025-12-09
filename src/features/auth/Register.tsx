/**
 * Register Page
 * Registration form with comprehensive Zod validation
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button, Card } from '../../design-system';
import { UserPlus, Mail, Lock, User, Phone } from 'lucide-react';
import styles from './Auth.module.css';

// Comprehensive Zod validation schema
const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name is too long')
      .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters'),
    lastName: z
      .string()
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name is too long')
      .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    phone: z
      .string()
      .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number')
      .optional()
      .or(z.literal('')),
    country: z.string().min(1, 'Please select a country'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    terms: z.boolean().refine((val) => val === true, 'You must accept the terms and conditions'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Registration data:', data);

    setIsLoading(false);
    navigate('/login');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <Card>
          <div className={styles.authHeader}>
            <div className={styles.authLogo}>
              <UserPlus size={40} />
            </div>
            <h1 className={styles.authTitle}>Create Account</h1>
            <p className={styles.authSubtitle}>Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className={styles.formField}>
                <label className={styles.label}>First Name</label>
                <Input
                  type="text"
                  placeholder="John"
                  leftElement={<User size={16} />}
                  error={!!errors.firstName}
                  {...register('firstName')}
                />
                {errors.firstName ? (
                  <span className={styles.errorText}>{errors.firstName.message}</span>
                ) : null}
              </div>

              <div className={styles.formField}>
                <label className={styles.label}>Last Name</label>
                <Input
                  type="text"
                  placeholder="Doe"
                  leftElement={<User size={16} />}
                  error={!!errors.lastName}
                  {...register('lastName')}
                />
                {errors.lastName ? (
                  <span className={styles.errorText}>{errors.lastName.message}</span>
                ) : null}
              </div>
            </div>

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
              <label className={styles.label}>
                Phone Number <span className={styles.optional}>(Optional)</span>
              </label>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                leftElement={<Phone size={16} />}
                {...register('phone')}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Country</label>
              <select className={styles.select} {...register('country')}>
                <option value="">Select your country</option>
                {countries.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.country ? (
                <span className={styles.errorText}>{errors.country.message}</span>
              ) : null}
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Password</label>
              <Input
                type="password"
                placeholder="Create a strong password"
                leftElement={<Lock size={16} />}
                error={!!errors.password}
                {...register('password')}
              />
              <span className={styles.helperText}>
                Min 8 characters, 1 uppercase, 1 lowercase, 1 number
              </span>
              {errors.password ? (
                <span className={styles.errorText}>{errors.password.message}</span>
              ) : null}
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Confirm Password</label>
              <Input
                type="password"
                placeholder="Re-enter your password"
                leftElement={<Lock size={16} />}
                error={!!errors.confirmPassword}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword ? (
                <span className={styles.errorText}>{errors.confirmPassword.message}</span>
              ) : null}
            </div>

            <div className={styles.checkbox}>
              <input type="checkbox" id="terms" {...register('terms')} />
              <label htmlFor="terms">
                I agree to the{' '}
                <Link to="/terms" className={styles.link}>
                  Terms and Conditions
                </Link>
              </label>
            </div>
            {errors.terms ? <span className={styles.errorText}>{errors.terms.message}</span> : null}

            <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>

            <div className={styles.authFooter}>
              <p>
                Already have an account?{' '}
                <Link to="/login" className={styles.link}>
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
