import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';


export const Piedepagina = () => {
  return (
    <footer className="bg-light mt-5 py-3">
      <div className="container">
        <p className="text-center">Copyright &copy; Sistema Web 2023</p>
        <p className="text-center">Contáctanos +502 5935-7232, Ciudad de Guatemala</p>
        <p className="text-center">Encuéntranos en nuestras redes sociales</p>
        <p className="text-center">
        <ul className="list-inline">
        <li className="list-inline-item">
          <a href="https://www.facebook.com/people/Top-Services-GT/100091143668538/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="4x" />
          </a>
        </li>
        <li className="list-inline-item">
          <a href="https://wa.me/telefono" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} size="4x" style={{color: "#5cd416",}} />
            
          </a>
        </li>
      </ul>
          
        </p>
      </div>
    </footer>
  );
};
