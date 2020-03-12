import React, { memo } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

const Email = memo((props) => {
  const { _id, date, to, from, cc, bcc, body } = props.content;

  const betterTo = to.join(', ');

  const { url } = useRouteMatch();

  // const replyToEmail = () => {
  //   props.reply(from);
  //   <Redirect to="/emails/create" />;
  // };

  return (
    <div style={{ borderBottom: '1px solid black' }}>
      <p>To: {betterTo}</p>
      <p>From: {from}</p>
      <p>Date: {date}</p>
      <p>{body}</p>
      <button onClick={() => props.deleteEmail(_id)}>Delete</button>
      {/* <button onClick={replyToEmail}>Reply</button> */}
      <Link
        onClick={() => {
          props.reply(from);
          props.setIsNew(true);
        }}
        to={`${url}/create`}>
        Reply
      </Link>
    </div>
  );
});

export default Email;
