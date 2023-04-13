import { app } from '../../src/firebase/configFirebase';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, sendEmailVerification } from 'firebase/auth';

  

const ValidacionEmail = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isEmailValidated, setIsEmailValidated] = useState(false);

  const auth = getAuth(app);

  const handleEmailValidation = async () => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setError('Este correo electrónico ya está registrado');
      } else {
        setIsEmailValidated(true);
        setError(null);
      }
    } catch (error) {
      setError('Hubo un error al validar el correo electrónico');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValidated) {
      setError('Por favor, valide su correo electrónico antes de continuar');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
      console.log('Usuario registrado:', userCredential.user);
    } catch (error) {
      setError('Hubo un error al registrar al usuario');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValidated(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Correo electrónico:</label>
      <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />
      {isEmailValidated ? (
        <>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
          {error && <p>{error}</p>}
          <button type="submit">Registrar</button>
        </>
      ) : (
        <>
          <button type="button" onClick={handleEmailValidation}>
            Validar correo electrónico
          </button>
          {error && <p>{error}</p>}
        </>
      )}
    </form>
  );

  /* const [email, setEmail] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();

    const auth = getAuth(app);
    const actionCodeSettings = {
      url: 'http://localhost:5173/prueba',
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // El correo de verificación se ha enviado correctamente
        console.log('Correo de verificación enviado');
        // Guardamos el email en el localStorage para poder utilizarlo después
        localStorage.setItem('emailForSignIn', email);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <form onSubmit={handleSignIn}>
      <label htmlFor="email">Correo electrónico:</label>
      <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />
      <button type="submit">Enviar correo de verificación</button>
    </form>
  ); */

  };

export default ValidacionEmail;





