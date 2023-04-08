import TodoListItem from '../todo-list-item/todo-list-item';
import EditItem from '../edit-item/edit-item';
import React from 'react';

import './todo-list.css';

import PropTypes from 'prop-types';

function TodoList({ tasks, renderMode, onDeleteTask, onCompleteTask, onEditTask, onPlay, onPause }) {
  const items = tasks.reduce((acc, task) => {
    let classList = '';
    const { description, created, id, editing, completed, timeInSec, isTimerOn } = task;
    let willRender = true;
    if (task.completed) {
      classList += ' completed';
    }
    if (task.editing) {
      classList += ' editing';
    }
    switch (renderMode) {
      case 'Active':
        if (task.completed) willRender = false;
        break;
      case 'Completed':
        if (!task.completed) willRender = false;
        break;
      default:
    }

    if (willRender) {
      acc.push(
        <li className={classList} key={task.id}>
          <EditItem description={task.description} id={task.id} onEditTask={onEditTask} />
          <TodoListItem
            description={description}
            created={created}
            id={id}
            editing={editing}
            completed={completed}
            onDeleteTask={onDeleteTask}
            onCompleteTask={onCompleteTask}
            onEditTask={onEditTask}
            onPlay={onPlay}
            onPause={onPause}
            timeInSec={timeInSec}
            isTimerOn={isTimerOn}
          />
        </li>
      );
    }
    // timeInSec суммарное количество времени undefind

    return acc;
  }, []);

  return <ul className="todo-list">{items}</ul>;
}

export default TodoList;

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      editing: PropTypes.bool.isRequired,
    })
  ).isRequired,
  renderMode: PropTypes.oneOf(['All', 'Active', 'Completed']),
  onCompleteTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  renderMode: 'All',
};
