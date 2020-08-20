import React, { Fragment, useContext } from 'react';

import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map((c) => (
        <h1>{c.name}</h1>
      ))}
    </Fragment>
  );
};

export default Contacts;
