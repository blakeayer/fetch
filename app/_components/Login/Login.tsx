import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, LoginFormSchema } from '@/models';

import { useAuth } from '@/lib/useAuth';

const Login = () => {
  const { register, formState, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });
  const { loginUser, loading, error } = useAuth();

  const onSubmit = async (formData: LoginFormData) => {
    loginUser(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <label>Name:</label>
          <input className="bg-slate-100 hover:bg-slate-300 text-slate-800 font-bold py-2 px-4 rounded-lg" {...register('name')} type={'text'} placeholder={'Enter your name'} />
          {formState.errors.name && <p>{formState.errors.name.message}</p>}

          <label>Email:</label>
          <input className="bg-slate-100 hover:bg-slate-300 text-slate-800 font-bold py-2 px-4 rounded-lg" {...register('email')} type={'email'} placeholder={'Enter your email'} />
          {formState.errors.email && <p>{formState.errors.email.message}</p>}
        </div>

        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          type="submit"
          disabled={formState.isSubmitting}
          value={formState.isSubmitting ? 'Logging in...' : 'Login'}
        />
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Unable to login at this time.</p>}
    </div>
  );
};

export default Login;
