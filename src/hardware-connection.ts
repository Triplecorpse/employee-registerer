import { init } from 'raspi';
import { Serial } from 'raspi-serial';

init(() => {
  const serial = new Serial();
  const parts: Buffer[] = [];
  let buffer: Buffer;
  let read: string;

  serial.open(() => {
    console.log('Place you RFID card');

    serial.on('data', (data: Buffer) => {
      parts.push(data);

      if (parts.length === 2) {
        const tempBuffer = Buffer.concat(parts);
        let tempRead = tempBuffer.toString();
        parts.length = 0;

        if (read !== tempRead) {
          buffer = tempBuffer;
          read = tempRead;
        }

        const tag = parseInt(buffer.slice(3, 11).toString(), 16).toString(10);
        const zeroes = 10 - tag.length;
        const id = '0'.repeat(zeroes) + tag;

        console.log(id);

        setTimeout(() => { tempRead = ''; }, 1000);
      }
    });
  });
});
