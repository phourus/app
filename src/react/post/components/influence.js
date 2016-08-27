import React from 'react'

const Influence = ({influence}) => {
  const range = Math.ceil(influence / 10)
  return (
    <div className={`influence influence${range}`}>
      <div className="score">{influence}</div>
      <div>Influence</div>
    </div>
  );
}

export default Influence
