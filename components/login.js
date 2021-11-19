import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import Loader from 'react-spinners/BeatLoader';
import useAddress from '../hooks/useAddress';
import { createProfile } from '../lukso/profile';
import styles from './login.module.css';

export default function Login() {
  const { setAddress } = useAddress();
  const router = useRouter();
  const formLogin = useRef();
  const formSignup = useRef();
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async (event) => {
    event.preventDefault();
    try {
      const address = event.target.address.value;
      if (address.length === 0) {
        return;
      }
      setLoading(true);
      formLogin.current.reset();
      setAddress(address);
      router.replace('/');
      router.reload();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [formLogin, router, setAddress]);

  const handleSignup = useCallback(async (event) => {
    event.preventDefault();
    try {
      const data = {
        name: event.target.name.value,
        description: event.target.description.value,
        profileImage: event.target.image.files[0],
      };
      if (data.name.length === 0 || data.description.length === 0 || !data.profileImage) {
        return;
      }
      setLoading(true);
      console.log(data);
      const result = await createProfile(data);
      console.log(result);
      setAddress(result.ERC725Account.address);
      formSignup.current.reset();
      router.replace('/');
      router.reload();
      // 0x97BA4A2a0cFED2DbA5e79e5fd89C5F20Cc53a2A3
      // 0x1ed52BDbcBF8E0C13d150a9BB1d799207D9be51F
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [formSignup, router, setAddress]);

  return (
    <div className={styles.container}>
      <form
        ref={formLogin}
        className={styles.login}
        onSubmit={handleLogin}>
        <h1>Login</h1>

        <div className="form-row">
          <input
            type="text"
            className="form-control"
            placeholder="New UP Address"
            name="address" />
        </div>

        <div className="form-row">
          <button
            type="submit"
            value="Submit"
            className="form-submit">
            Login
          </button>
        </div>
      </form>

      <form
        ref={formSignup}
        className={styles.signup}
        onSubmit={handleSignup}>
        <h1>Sign Up</h1>

        <div className="form-row">
          <label htmlFor="signup-image">Profile Image</label>
          <input
            type="file"
            className="filetype"
            name="image" />
        </div>

        <div className="form-row">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name" />
        </div>

        <div className="form-row">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            name="description"
            style={{ height: "100px" }} />
        </div>

        <div className="form-row">
          <button
            type="submit"
            value="Submit"
            className="form-submit">
            Sign Up
          </button>
        </div>
      </form>

      {loading && (
        <div className="loader">
          <Loader loading={true} />
        </div>
      )}
    </div>
  );
}
