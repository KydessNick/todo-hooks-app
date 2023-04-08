import TaskFilter from '../task-filter/task-filter';
import React from 'react';

import './footer.css';

import PropTypes from 'prop-types';

// export default class Footer extends Component{
//     render(){
//         return(
//             <p>Abobubs Footer</p>
//         )
//     }
// }

function Footer({ itemsLeft, onRenderModeChange, renderOptions, renderMode, currentTaskFilter, onDeleteAllComplete }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TaskFilter
        onRenderModeChange={onRenderModeChange}
        renderOptions={renderOptions}
        currentTaskFilter={currentTaskFilter}
        renderMode={renderMode}
      />
      <button className="clear-completed" onClick={() => onDeleteAllComplete()} type="button">
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;

Footer.propTypes = {
  itemsLeft: PropTypes.number.isRequired,
  renderOptions: PropTypes.oneOf(['All', 'Active', 'Completed']),
  currentTaskFilter: PropTypes.arrayOf(PropTypes.string),
  onRenderModeChange: PropTypes.func.isRequired,
  onDeleteAllComplete: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  renderOptions: 'All',
  currentTaskFilter: ['All', 'Active', 'Completed'],
};
