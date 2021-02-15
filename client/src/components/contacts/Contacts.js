import React, { useContext, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';

export default function Contacts() {
  //Any actions associated with contactContext are now accessible to this component, by using this line
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;
  if (contacts.length === 0) {
    return <h4>Please add contact</h4>;
  }
  //If something (name, letter) is in the filter input, then we map through what's in there and show the contact item for whatever contact matches what's in there. Else we just show the current contacts
  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
}
