import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth, signIn, signUp } from '../lib';

type Props = {
  action: 'sign-up' | 'sign-in';
  onSignIn: (auth: Auth) => void;
};

/**
 * Form that signs in a user.
 */
export default function AuthForm({ action, onSignIn }: Props) {
  const navigate = useNavigate();
  const [error, setError] = useState<unknown>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    async function handleSignUp(username: string, password: string) {
      await signUp(username, password);
      navigate('/sign-in');
    }
    async function handleSignIn(username: string, password: string) {
      const auth = await signIn(username, password);
      if (auth.user && auth.token) {
        onSignIn(auth);
      }
    }
    event.preventDefault();
    if (event.currentTarget === null) throw new Error();
    const formData = new FormData(event.currentTarget);
    const entries = Object.fromEntries(formData.entries());
    const username = entries.username as string;
    const password = entries.password as string;
    try {
      if (action === 'sign-up') {
        await handleSignUp(username, password);
      } else {
        await handleSignIn(username, password);
      }
    } catch (err) {
      setError(err);
    }
  }

  const alternateActionTo = action === 'sign-up' ? '/sign-in' : '/sign-up';
  const alternateActionText =
    action === 'sign-up' ? 'Sign in instead' : 'Register now';
  const submitButtonText = action === 'sign-up' ? 'Register' : 'Log In';

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-2 text-start">
        <label className="m-2">
          Username:
          <input
            required
            autoFocus
            type="text"
            name="username"
            className="text-black m-2"
          />
        </label>
      </div>
      <div className="m-2 sm:text-right">
        <label className="m-2">
          Password:
          <input
            required
            type="password"
            name="password"
            className="text-black m-2"
          />
        </label>
      </div>
      <div className="flex flex-col items-center justify-around">
        <button
          type="submit"
          className="bg-[#d9d9d9] text-black m-2 w-20 rounded-sm">
          {submitButtonText}
        </button>
        <small>
          <Link to={alternateActionTo}>{alternateActionText}</Link>
        </small>
      </div>
      <>
        {error && (
          <div style={{ color: 'red' }}>
            Error:{' '}
            {error instanceof Error
              ? error.message + ': Username or password do not match'
              : 'Unknown Error'}
          </div>
        )}
      </>
    </form>
  );
}
