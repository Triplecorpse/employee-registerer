import { Student } from './student.schema';
import { Visitor } from './visitor.schema';

export function passIdController(buff: Buffer) {
  const tag = parseInt(buff.slice(3, 11).toString(), 16).toString(10);
  const zeroes = 10 - tag.length;
  const id = '0'.repeat(zeroes) + tag;

  Student.find({ passId: id }).then(async (val: any) => {
    if (val.length === 0) {
      const student = new Student({ name: 'Ksusha', surname: 'Antonova', passId: id });
      await student.save();
    } else {
      const visitor = new Visitor({
        name: val[0].name,
        surname: val[0].surname,
        passId: val[0].passId,
        date: new Date(),
      });
      await visitor.save();
    }
  });
}
