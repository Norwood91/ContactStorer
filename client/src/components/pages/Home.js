import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

export default function Home() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    //this will load user, validate the user in the back end and put the user in state
    authContext.loadUser();
    //the brackets after the comma means that this will only run once
    //eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
}
