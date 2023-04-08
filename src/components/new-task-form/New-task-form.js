import React, { useState } from 'react';

import './New-task-form.css';

// import PropTypes, { func } from 'prop-types';
import PropTypes from 'prop-types';

export default function NewTaskForm(props) {
  const [inputValue, setTaskValue] = useState('');
  const [inputMin, setMinValue] = useState('');
  const [inputSec, setSecValue] = useState('');

  const onEnterPress = (e) => {
    const { onItemAdded } = props;
    // setIdCounter((prev) => prev + 1);
    e.preventDefault();

    if (inputValue && inputValue.trim().length) {
      onItemAdded(inputValue.trim(), inputMin, inputSec);
      setTaskValue('');
      setMinValue('');
      setSecValue('');
    } else {
      setTaskValue('');
      alert('Please type a text');
    }
  };

  const newTaskChangeHandler = (e) => {
    const { target } = e;
    const { name, value } = target;

    if (name === 'description') setTaskValue(value);
    if (name === 'minutes') setMinValue(value);
    if (name === 'seconds') setSecValue(value);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <form className="new-todo-form" onSubmit={onEnterPress}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        name="description"
        onChange={newTaskChangeHandler}
        minLength="1"
        maxLength="20"
        required
      />
      <input
        type="text"
        className="new-todo-form__timer"
        value={inputMin}
        name="minutes"
        placeholder="Min"
        onChange={newTaskChangeHandler}
        pattern="[0-9]*"
        minLength="1"
        required
      />
      <input
        type="text"
        className="new-todo-form__timer"
        value={inputSec}
        name="seconds"
        placeholder="Sec"
        onChange={newTaskChangeHandler}
        pattern="[0-6]{1}[0-9]*"
        minLength="1"
        required
      />
      <button type="submit" aria-label="submission" />
    </form>
  );
}

NewTaskForm.propTypes = {
  // value: PropTypes.string,
  // newTaskChangeHandler: PropTypes.func.isRequired,
  onItemAdded: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  // value: '',
};
