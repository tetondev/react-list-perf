import React, {useCallback} from 'react';
import checkmark from './assets/check-circle.svg'
import './card.css';

const Card = ({children, id, selected, updateSelectedStatus}) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        updateSelectedStatus(id)
      }
    },
    [updateSelectedStatus, id]
  )

  return (
    <div className="card" role="checkbox" aria-checked={selected ? '' : undefined} tabIndex={0} onClick={(e)=> updateSelectedStatus(id, e.shiftKey)} onKeyDown={handleKeyDown}>
      {children}
      {selected && <div className="checkContainer"><img className="checkmark" alt="selected" src={checkmark} /></div>}
    </div>
  );
};

export default Card;