import css from '../ContactForm/ContactForm.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';

export class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    };

    nameInputId = nanoid();
    numberInputId = nanoid();

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      };

      handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    };

    reset = () => {
        this.setState({name: '', number: ''});
    }

    render() {
        const {name, number} = this.state;
        return (
            <form onSubmit={this.handleSubmit} className={css.form}>
                <label htmlFor={this.nameInputId} className={css.form__label}>Name</label>
                <input
                className={css.form__inputName}
                id={this.nameInputId}
                type="text"
                name="name"
                value={name}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                onChange={this.handleChange}
                />
                <label htmlFor={this.numberInputId} className={css.form__label}>Number</label>
                <input
                className={css.form__inputName}
                id={this.numberInputId}
                type="tel"
                name="number"
                value={number}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={this.handleChange}
                />
                <button 
                type='submit'
                className={css.form__submitBtn}
                >
                    Add Contact
                </button>
            </form>
        );
    };
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };