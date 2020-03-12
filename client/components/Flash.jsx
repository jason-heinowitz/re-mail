import React from 'react';

const Flash = ({ message, group, index, remove }) => (
  <div className={group} onClick={() => remove(index)}>
    <p>{message}</p>
  </div>
);

export default Flash;
