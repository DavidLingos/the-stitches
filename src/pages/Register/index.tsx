import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../../context/firebase';
import './index.css';

interface RegisterForm {
  email: string;
  password: string;
  name: string;
}

export const Register = () => {
  const {
    auth: { auth, registerWithEmailAndPassword, signInWithGoogle },
  } = useFirebase();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/home');
  }, [user, loading, navigate]);

  return (
    <div className="register">
      <form
        className="register__container"
        onSubmit={handleSubmit((data) => registerWithEmailAndPassword(data.name, data.email, data.password))}>
        <div className="register__textBox">
          <input type="text" {...register('name', { required: true })} placeholder="Full Name" />
          {errors.name && <span>Toto pole je povinné</span>}
        </div>
        <div className="register__textBox">
          <input type="text" {...register('email', { required: true })} placeholder="E-mail Address" />
          {errors.email && <span>Toto pole je povinné</span>}
        </div>
        <div className="register__textBox">
          <input type="password" {...register('password', { required: true })} placeholder="Password" />
          {errors.password && <span>Toto pole je povinné</span>}
        </div>

        <button className="register__btn" type="submit">
          Registrovat
        </button>
        <button type="button" className="register__btn register__google" onClick={signInWithGoogle}>
          Registrovat pomocí Google
        </button>
        <div>
          iž máte účet? <Link to="/">Přihlaste se</Link> nyní.
        </div>
      </form>
    </div>
  );
};
