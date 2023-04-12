/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';

import './task-filter.css';

import PropTypes from 'prop-types';

export default function TaskFilter(props) {
  let key = 0;

  const { renderOptions, renderMode, onRenderModeChange } = props;
  const items = renderOptions.map((option) => (
    <li key={key++}>
      <button
        onClick={() => onRenderModeChange(option)}
        className={renderMode === option ? 'selected' : null}
        type="button"
      >
        {option}
      </button>
    </li>
  ));

  return <ul className="filters">{items}</ul>;
}

TaskFilter.propTypes = {
  renderMode: PropTypes.oneOf(['All', 'Active', 'Completed']),
  renderOptions: PropTypes.arrayOf(PropTypes.string),
  onRenderModeChange: PropTypes.func.isRequired,
};

TaskFilter.defaultProps = {
  renderMode: 'All',
  renderOptions: ['All', 'Active', 'Completed'],
};
