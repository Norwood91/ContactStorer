import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

export default function ContactForm() {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, clearCurrent, current } = contactContext;

  useEffect(() => {
    //if there isn't a contact ready to edit/update
    if (current !== null) {
      //add the contact data to the form
      setContact(current);
      //else reset the form to be empty
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
    //this happens on occasions to where the contactContext is changed or the current value is changed
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });
  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    e.preventDefault();
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2 className='text-primary'>
          {current ? 'Edit Contact' : 'Add Contact'}
        </h2>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={onChange}
        />
        <input
          type='email'
          placeholder='Email@email.com'
          name='email'
          value={email}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Phone number'
          name='phone'
          value={phone}
          onChange={onChange}
        />
        <h5>Contact Type</h5>
        <input
          type='radio'
          name='type'
          value='personal'
          checked={type === 'personal'}
          onChange={onChange}
        />
        Personal{' '}
        <input
          type='radio'
          name='type'
          value='professional'
          checked={type === 'professional'}
          onChange={onChange}
        />{' '}
        Professional
        <div>
          <input
            type='submit'
            value={current ? 'Update Contact' : 'Add Contact'}
            className='btn btn-primary btn-block'
          />
        </div>
        {current && (
          <div>
            <button className='btn btn-light btn-block' onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
