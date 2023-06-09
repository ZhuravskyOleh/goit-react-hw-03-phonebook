import { Component } from 'react';
import { nanoid } from 'nanoid';

import { initialData } from 'data';
import { ContactForm } from './ContantForm/ContactForm.jsx';
import { Filter } from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const locStorageContacts = localStorage.getItem('contacts');
    this.setState({
      contacts: locStorageContacts
        ? JSON.parse(locStorageContacts)
        : initialData,
    });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  deleteContact = delId => {
    const newList = this.state.contacts.filter(({ id }) => id !== delId);
    this.setState({ contacts: newList });
  };

  existRow = existName => alert(`Record ${existName} already exists`);

  handleForm = row => {
    if (this.state.contacts.find(({ name }) => name === row.name)) {
      this.existRow(row.name);
      return;
    }
    this.setState(prev => {
      return {
        contacts: [{ id: nanoid(), ...row }, ...prev.contacts],
      };
    });
  };

  handlerChangeFilter = e => this.setState({ filter: e.target.value });

  render() {
    const { filter, contacts } = this.state;
    return (
      <div>
        <h1 style={{textAlign:"center"}}>Phonebook</h1>
        <ContactForm onForm={this.handleForm} />

        <h2 style={{ textAlign: "center" }}>Contacts</h2>
        <Filter value={filter} handlerChangeFilter={this.handlerChangeFilter} />
        <ContactList
          filter={filter}
          contacts={contacts}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}


