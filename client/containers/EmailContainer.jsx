import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions/emailSaga';
import Email from '../components/Email';
import CreateEmail from '../components/CreateEmail';

const mapStateToProps = (state) => ({
  emails: state.email.emails,
});

const mapDispatchToProps = (dispatch) => ({
  getEmails: () => dispatch(actions.getEmails()),
  sendEmail: (obj) => dispatch(actions.sendEmail(obj)),
  deleteEmail: (id) => dispatch(actions.deleteEmail(id)),
});

const EmailContainer = (props) => {
  // props.getEmails();
  const [isNew, setIsNew] = useState(false);

  const { url } = useRouteMatch();

  const emails = props.emails.map((email) => (
    <Email key={email._id} deleteEmail={props.deleteEmail} content={email} />
  ));

  return (
    <>
      <h3>Emails</h3>
      <button onClick={props.getEmails} type="submit">
        Get emails
      </button>
      {isNew === false ? (
        <Link to={`${url}/create`} onClick={() => setIsNew(true)}>
          New Email
        </Link>
      ) : (
        <Link to="/emails" onClick={() => setIsNew(false)}>
          Cancel
        </Link>
      )}

      <Switch>
        <Route path={`${url}/create`}>
          <CreateEmail sendEmail={props.sendEmail} />
        </Route>
      </Switch>
      {emails.length > 0 ? emails.reverse() : <p>No emails to display</p>}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailContainer);
