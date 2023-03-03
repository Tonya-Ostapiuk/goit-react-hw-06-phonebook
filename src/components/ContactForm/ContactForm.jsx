import propTypes from 'prop-types';
import { useState } from 'react';

import {
  FormStyled,
  LabelStyled,
  InputStyled,
  BtnStyled,
} from './ContactForm.styled';

export function ContactForm({onSubmit}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit({ name: name, number: number });
    setName('')
    setNumber('')
  };

  const handleChangeName = evt => {
    const { value } = evt.target;
    setName(value);
  };

  const handleChangeNumber = evt => {
    const { value } = evt.target;
    setNumber(value);
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <LabelStyled>
        Name
        <InputStyled
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Name"
          value={name}
          onChange={handleChangeName}
        />
      </LabelStyled>
      <LabelStyled>
        Number
        <InputStyled
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Phone number"
          value={number}
          onChange={handleChangeNumber}
        />
      </LabelStyled>

      <BtnStyled type="submit">Add contact</BtnStyled>
    </FormStyled>
  );
}


ContactForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
