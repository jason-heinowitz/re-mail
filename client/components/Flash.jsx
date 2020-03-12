import React from 'react';

const Flash = ({ message, group, index, remove }) => (
  <div className={`flash ${group}`} onClick={() => remove(index)}>
    <p>{message}</p>
    <p className="dismiss">Dismiss</p>
  </div>
);

export default Flash;
