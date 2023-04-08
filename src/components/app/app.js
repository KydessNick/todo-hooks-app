import NewTaskForm from '../new-task-form/New-task-form';
import TodoList from '../todo-list';
import Footer from '../footer/footer';
import React, { useState } from 'react';

import './app.css';

export default function App() {
  const renderOptions = ['All', 'Active', 'Completed'];
  let idCounter = 0;

  const createTask = (description, timeInSec) => ({
    description,
    created: new Date(),
    id: idCounter++,
    completed: false,
    editing: false,
    timeInSec,
    isTimerOn: false,
  });
  const [tasksState, setTask] = useState({
    tasks: [createTask('create app', '61')],
  });

  const [renderMode, setRenderMode] = useState('All');

  const timeGet = (minutes, seconds) => +minutes * 60 + +seconds;

  const addTask = (description, minutes, seconds) => {
    const timeInSec = timeGet(minutes, seconds);
    const newItem = createTask(description, timeInSec);
    setTask(({ tasks }) => ({
      tasks: [...tasks, newItem],
    }));
  };

  const toggleProperty = (arr, id, propName, value = !arr[arr.findIndex((item) => item.id === id)][propName]) => {
    const i = arr.findIndex((el) => el.id === id);
    const oldItem = arr[i];
    const newItem = { ...oldItem, [propName]: value };
    return [...arr.slice(0, i), newItem, ...arr.slice(i + 1)];
  };

  const playBtn = (id) => {
    setTask(({ tasks }) => ({ tasks: toggleProperty(tasks, id, 'isTimerOn', true) }));
  };

  const pauseBtn = (id) => {
    setTask(({ tasks }) => ({ tasks: toggleProperty(tasks, id, 'isTimerOn', false) }));
  };

  const deleteTask = (id) => {
    setTask(({ tasks }) => {
      const i = tasks.findIndex((el) => el.id === id);
      const newArray = [...tasks.slice(0, i), ...tasks.slice(i + 1)];

      return {
        tasks: newArray,
      };
    });
  };

  const completeTask = (id) => {
    setTask(({ tasks }) => ({
      tasks: toggleProperty(tasks, id, 'completed'),
    }));
  };

  const editTask = (id, description) => {
    const { tasks } = tasksState;
    const i = tasks.findIndex((el) => el.id === id);
    const oldItem = tasks[i];
    const newItem = { ...oldItem, editing: !oldItem.editing, description };
    const newArr = [...tasks.slice(0, i), newItem, ...tasks.slice(i + 1)];
    setTask((prev) => ({
      ...prev,
      tasks: newArr,
    }));
  };

  const deleteAllComplete = () => {
    const { tasks } = tasksState;
    tasks.forEach((task) => {
      if (task.completed) deleteTask(task.id);
    });
  };

  const { tasks, description, minutes, seconds } = tasksState;

  const itemsLeft = tasks.reduce((acc, task) => {
    if (!task.completed) acc++;
    return acc;
  }, 0);
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addTask} description={description} minutes={minutes} seconds={seconds} />
      </header>

      <section className="main">
        <TodoList
          tasks={tasks}
          renderMode={renderMode}
          onCompleteTask={completeTask}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          onPlay={playBtn}
          onPause={pauseBtn}
        />
        <Footer
          itemsLeft={itemsLeft}
          onDeleteAllComplete={deleteAllComplete}
          onRenderModeChange={setRenderMode}
          renderMode={renderMode}
          renderOptions={renderOptions}
        />
      </section>
    </section>
  );
}
