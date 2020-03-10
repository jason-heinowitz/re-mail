import React, { useState } from 'react';

const CreateEmail = (props) => {
  const [to, setTo] = useState('');
  const [body, setBody] = useState('');

  const checkEmail = ({ to, body }) => {
    if (to.length < 1) {
      console.log('Must have a recipient');
      return;
    }
    if (body.length < 1) {
      console.log('Must have a body');
      return;
    }

    let newTo = to.split(',');
    newTo = newTo.map((rec) => rec.trim());

    props.sendEmail({ to: newTo, body });
  };

  return (
    <div>
      <h2>Create Email</h2>

      <label htmlFor="to">
        To:
        <input
          type="text"
          name="to"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </label>
      <label htmlFor="body">
        Body:
        <textarea
          name="body"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>

      <button onClick={() => checkEmail({ to, body })}>Send</button>
    </div>
  );
};

export default CreateEmail;
