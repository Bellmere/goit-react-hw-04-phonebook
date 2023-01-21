import React, { Component } from 'react';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';


export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmitForm = data => {
    const id = nanoid();
    const contact = {id, ...data};
    const contactLists = [...this.state.contacts];
    if (contactLists.findIndex(item => item.name.toLowerCase() === contact.name.toLowerCase()) !== -1) {
      return alert(`${contact.name} is already in contacts.`);
    } else {
      contactLists.push(contact);
    }

    this.setState({contacts: contactLists});
    console.log(contactLists);
  };

  getNewList = () => {
    const {filter, contacts} = this.state;
    const newContactList = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    })
    return newContactList;
  };

  onDelete = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== e),
    }));
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({contacts: parseContacts});
    }
  };

  componentDidUpdate(prevState, prevProps) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  render() {
    const {filter} = this.state;

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm
        onSubmit={this.onSubmitForm}
        />
        <h2>Contacts</h2>
        <Filter
        filter={filter} 
        handleChange={this.handleChange}
        />
        <ContactList
        contacts={this.getNewList()}
        onDelete={this.onDelete}
        />
      </div>
    );
  }
}