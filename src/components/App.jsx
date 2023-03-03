import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { H1Styled, H2Styled } from './App.styled';

const CONTACTS_KEY = 'contacts';

export function App() {
  const localData = JSON.parse(localStorage.getItem(CONTACTS_KEY));
  const [contacts, setContacts] = useState(
    () =>
      localData ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = evt => {
    const { value } = evt.target;
    setFilter( value );
  };

  const handleSubmit = evt => {
    const id = nanoid();
    const name = evt.name;
    const number = evt.number;
    const contactsLists = [...contacts];

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ name, id, number} );
    }

    setContacts( contactsLists );
  };

  const contactDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  
  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(contact => {
          return contact.name
            .toLowerCase()
            .includes(filter.toLowerCase());
        });
      
        return filterContactsList;

  };


  return (
    <div>
      <H1Styled>Phonebook</H1Styled>
      <ContactForm onSubmit={handleSubmit} />
      <H2Styled> Contacts</H2Styled>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList
        contacts={getFilteredContacts()}
        contactDelete={contactDelete}
      />
    </div>
  );
}


