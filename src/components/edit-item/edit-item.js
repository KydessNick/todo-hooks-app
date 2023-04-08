import React, { Component } from 'react';

import './edit-item.css';

import PropTypes from 'prop-types';

export default class EditItem extends Component {
  canBlur = true;

  constructor(props) {
    super(props);
    this.state = {
      value: props.description,
    };
  }

  preventBlur = () => {
    this.canBlur = false;
    setTimeout(() => {
      this.canBlur = true;
    }, 10);
  };

  changeHandler = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onEnterPress = (e) => {
    const { onEditTask, id } = this.props;
    const { value } = this.state;
    if (e.keyCode === 13) {
      this.preventBlur();
      onEditTask(id, value);
    }
  };

  blurHandler = () => {
    const { onEditTask, id } = this.props;
    const { value } = this.state;
    if (this.canBlur) {
      onEditTask(id, value);
    }
  };

  render() {
    const { value } = this.state;
    return (
      <input
        type="text"
        value={value}
        onChange={this.changeHandler}
        onKeyDown={this.onEnterPress}
        onBlur={this.blurHandler}
        className="edit"
      />
    );
  }
}

EditItem.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onEditTask: PropTypes.func.isRequired,
};
