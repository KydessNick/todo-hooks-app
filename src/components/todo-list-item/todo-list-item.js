import ItemTimer from '../item-timer/item-timer';
import React, { Component } from 'react';

// import formatDistanceToNow from "date-fns/formatDistanceToNow";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './todo-list-item.css';

import PropTypes from 'prop-types';

export default class TodoListItem extends Component {
  clickHandler = () => {
    const { onEditTask, id, description } = this.props;
    onEditTask(id, description);
    // setTimeout(() => e.target.closest('li').querySelector('.edit').focus(), 50);
  };

  render() {
    // eslint-disable-next-line prettier/prettier
    const { description, created, id, completed, onDeleteTask, onCompleteTask, onPlay, onPause, timeInSec, isTimerOn } = this.props;
    const delId = `${id}del`;
    const editId = `${id}edit`;

    return (
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={() => onCompleteTask(id)} id={id} />

        <label htmlFor={`${id} ${delId} ${editId}`}>
          <span className="description">{description}</span>
          <ItemTimer
            isTimerOn={isTimerOn}
            onPlay={() => onPlay(id)}
            onPause={() => onPause(id)}
            timeInSec={timeInSec}
          />
          <span className="created">{formatDistanceToNow(created)}</span>
        </label>

        <button className="icon icon-edit" onClick={this.clickHandler} type="button" id={editId} />
        <button className="icon icon-destroy" onClick={() => onDeleteTask(id)} type="button" id={delId} />
      </div>
    );
  }
}

TodoListItem.propTypes = {
  description: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
};
