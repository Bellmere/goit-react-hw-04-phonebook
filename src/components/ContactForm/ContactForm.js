import css from '../ContactForm/ContactForm.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export const ContactForm = (props) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const nameInputId = nanoid();
    const numberInputId = nanoid();

    const handleChange = e => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value)
                break;
            case 'number':
                setNumber(value);
                break;
        
            default:
                break;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.onSubmit({name, number});
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    }

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <label htmlFor={nameInputId} className={css.form__label}>Name</label>
            <input
            className={css.form__inputName}
            id={nameInputId}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
            />
            <label htmlFor={numberInputId} className={css.form__label}>Number</label>
            <input
            className={css.form__inputName}
            id={numberInputId}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            />
            <button 
            type='submit'
            className={css.form__submitBtn}
            >
                Add Contact
            </button>
        </form>
    );
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };