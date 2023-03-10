import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';
import { ContactForm } from './ContactForm/ContactForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  addContact = contacts => {
    if (this.state.contacts.some(el => el.name === contacts.name)) {
      alert(`${contacts.name} is already in contacts!`);
      return;
    }
    const contactsList = { id: nanoid(), ...contacts };
    this.setState({
      contacts: [contactsList, ...this.state.contacts],
    });
  };

  searchContact = event => {
    const value = event.target.value;
    this.setState({
      filter: value,
    });
  };

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(el => el.id !== id),
    });
  };

  render() {
    const filterContact = this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(this.state.filter.toLowerCase().trim())
    );
    return (
      <>
        <GlobalStyle />
        <div>
          <h1>Phonebook</h1>
          <ContactForm onAddContact={this.addContact} />
          <h2>Contacts</h2>
          <Filter value={this.state.filter} onSearch={this.searchContact} />
          <Contacts contacts={filterContact} onDelete={this.deleteContact} />
        </div>
      </>
    );
  }
}
