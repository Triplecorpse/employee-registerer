import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  passId: Number,
  name: String,
  surname: String,
});

// tslint:disable-next-line: variable-name
export const Student = mongoose.model('Student', studentSchema);
