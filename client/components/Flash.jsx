import React from 'react';

const Flash = ({ message, group, index, remove }) => (
  <div className={group} onClick={() => remove(index)}>
    <strong>{message}</strong>
  </div>
);

export default Flash;
