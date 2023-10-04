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
        handleSignUp(username, password);
      } else {
        handleSignIn(username, password);
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
      <div>
        <label>
          Username:
          <input required autoFocus type="text" name="username" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input required type="password" name="password" />
        </label>
      </div>
      <div>
        <small>
          <Link to={alternateActionTo}>{alternateActionText}</Link>
        </small>
        <button type="submit">{submitButtonText}</button>
      </div>
      <>
        {error && (
          <div style={{ color: 'red' }}>
            Error: {error instanceof Error ? error.message : 'Unknown Error'}
          </div>
        )}
      </>
    </form>
  );
}
