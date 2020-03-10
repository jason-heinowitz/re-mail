import React, { memo } from 'react';

const Email = memo((props) => {
  const { _id, date, to, from, cc, bcc, body } = props.content;

  const betterTo = to.join(', ');

  return (
    <div style={{ borderBottom: '1px solid black' }}>
      <p>To: {betterTo}</p>
      <p>From: {from}</p>
      <p>Date: {date}</p>
      <p>{body}</p>
    </div>
  );
});

export default Email;
