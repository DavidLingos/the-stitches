import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import './index.css';
import { useFirebase } from '../../context/firebase';
import { useForm } from 'react-hook-form';

interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    auth: { logInWithEmailAndPassword, signInWithGoogle },
  } = useFirebase();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  return (
    <div className="login">
      <form className="login__container" onSubmit={handleSubmit((data) => logInWithEmailAndPassword(data.email, data.password))}>
        <div className="login__textBox">
          <input type="text" {...register('email', { required: true })} placeholder="E-mail Address" />
          {errors.email && <span>Toto pole je povinné</span>}
        </div>
        <div className="login__textBox">
          <input type="password" {...register('password', { required: true })} placeholder="Password" />
          {errors.password && <span>Toto pole je povinné</span>}
        </div>
        <button className="login__btn" type="submit">
          Přihlásit
        </button>
        <button type="button" className="login__btn login__google" onClick={signInWithGoogle}>
          Přihlásit pomocí Google
        </button>
        <div>
          <Link to="/reset">Zapomněl jsem heslo</Link>
        </div>
        <div>
          Ještě nemáte účet? <Link to="/register">Zaregistrujte se</Link> nyní.
        </div>
      </form>
    </div>
  );
};
