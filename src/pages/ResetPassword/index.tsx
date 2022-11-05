import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useFirebase } from '../../context/firebase';
import './index.css';

interface ResetForm {
  email: string;
}

export const ResetPassword = () => {
  const {
    auth: { auth, sendPasswordReset },
  } = useFirebase();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  return (
    <div className="reset">
      <form className="reset__container" onSubmit={handleSubmit((data) => sendPasswordReset(data.email))}>
        <input type="text" {...register('email', { required: true })} placeholder="E-mail Address" />
        {errors.email && <span>Toto pole je povinné</span>}
        <button className="reset__btn" type="submit">
          Resetovat heslo
        </button>

        <div>
          JEště nemáte účet? <Link to="/register">Registrujte se</Link> nyní.
        </div>
      </form>
    </div>
  );
};
