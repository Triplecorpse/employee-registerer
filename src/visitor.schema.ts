import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  passId: Number,
  name: String,
  surname: String,
  date: Date,
});

// tslint:disable-next-line: variable-name
export const Visitor = mongoose.model('Visitor', visitorSchema);
