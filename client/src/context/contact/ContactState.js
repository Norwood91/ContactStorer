import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Forrest Gump',
        email: 'forrest@gmail.com',
        phone: '111-111-2222',
        type: 'professional',
      },
      {
        id: 3,
        name: 'Olivia Munn',
        email: 'olivia@gmail.com',
        phone: '111-111-3333',
        type: 'wife',
      },
    ],
  };

  //dispatch allows us to dispatch object to the reducer
  //state allows us to access anything in our state
  const [state, dispatch] = useReducer(contactReducer, initialState);
  //Add contacts
  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  //Delete Contact
  //Set Current Contact
  //Clear Current Contact
  //Update Contact
  //Filter contacts
  //Clear Filter

  return (
    //Anything you want any component to access throughout the app goes inside the value brackets
    <ContactContext.Provider value={{ contacts: state.contacts, addContact }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
