import { app } from '../../src/firebase/configFirebase';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { useState } from 'react';
  

const ValidacionEmail = () => {

  const [email, setEmail] = useState('');

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
  );

  };

export default ValidacionEmail;
