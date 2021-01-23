import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import { CLEAR_FILTER, FILTER_CONTACTS } from '../../context/types';
export default function ContactFilter() {
  const contactContext = useContext(ContactContext);
  //initializes the ref
  const text = useRef('');

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    //this will give us the actual value of the input
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <React.Fragment>
      <form>
        <input
          ref={text}
          type='text'
          placeholder='Filter Contacts'
          onChange={onChange}
        />
      </form>
    </React.Fragment>
  );
}
