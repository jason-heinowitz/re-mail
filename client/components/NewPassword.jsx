import React, { useState } from 'react';

const NewPassword = (props) => {
  const checkPassword = ({ oldPassword, newPassword, confirmNewPassword }) => {
    if (newPassword.length < 8 || confirmNewPassword.length < 8) {
      console.log('New password must be longer than 7 characters');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      console.log('New password must match confirm field.');
      return;
    }

    props.newPassword({ oldPassword, newPassword });
  };

  const [old, setOld] = useState('');
  const [np, setNp] = useState('');
  const [npc, setNpc] = useState('');

  return (
    <div>
      <h2>Change Password</h2>

      <label htmlFor="oldPassword">
        Old Password:
        <input
          type="text"
          name="oldPassword"
          id="oldPassword"
          value={old}
          onChange={(e) => setOld(e.target.value)}
        />
      </label>
      <label htmlFor="newPassword">
        New Password:
        <input
          type="text"
          name="newPassword"
          id="newPassword"
          value={np}
          onChange={(e) => setNp(e.target.value)}
        />
      </label>
      <label htmlFor="confirmNewPassword">
        Confirm New Password:
        <input
          type="text"
          name="confirmNewPassword"
          id="cofirmNewPassword"
          value={npc}
          onChange={(e) => setNpc(e.target.value)}
        />
      </label>

      <button
        onClick={() =>
          checkPassword({
            oldPassword: old,
            newPassword: np,
            confirmNewPassword: npc,
          })
        }>
        Submit
      </button>
    </div>
  );
};

export default NewPassword;
