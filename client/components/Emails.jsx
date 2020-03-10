import React from 'react';

const Emails = (props) => {
  return (
    <div>
      <h2>Emails</h2>
      <button onClick={props.getEmails}>Get emails</button>
    </div>
  );
};

export default Emails;
