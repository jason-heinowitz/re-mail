const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://admin:hnpI4fWVhSsTsUGU@cluster0-8pown.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const Schema = mongoose.Schema;

const emailSchema = new Schema({
  to: {
    type: [
      {
        type: String,
      },
    ],
  },
  cc: {
    type: [
      {
        type: String,
      },
    ],
  },
  bcc: {
    type: [
      {
        type: String,
      },
    ],
  },
  from: {
    type: String,
  },
  date: String,
  body: String,
  replies: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'email',
      },
    ],
  },
});

const Email = mongoose.model('email', emailSchema);

module.exports = {
  Email,
};
