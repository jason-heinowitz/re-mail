import React, { Component } from 'react';
import Email from './Email';
import { Redirect } from 'react-router';

// const Emails = (props) => {
//   // ;

//

//   return (
//     <div>
//       <h2>Emails</h2>
//       {emails}
//     </div>
//   );
// };

class Emails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEmails();
  }

  render() {
    const emails = this.props.emails.map((em) => (
      <Email content={em} key={em._id} deleteEmail={this.props.deleteEmail} />
    ));

    return (
      <div>
        <h2>Emails</h2>
        {emails}
      </div>
    );
  }
}

export default Emails;
