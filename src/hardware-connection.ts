import { init } from 'raspi';
import { Serial } from 'raspi-serial';
import { passIdController } from './pass-id-controller';

init(() => {
  const serial = new Serial();
  const parts: Buffer[] = [];
  let buffer: Buffer;
  let read: string;

  serial.open(() => {
    console.log('Place you RFID card');

    serial.on('data', (data) => {
      parts.push(data);

      if (parts.length === 2) {
        const tempBuffer = Buffer.concat(parts);
        let tempRead = tempBuffer.toString();
        parts.length = 0;

        if (read !== tempRead) {
          buffer = tempBuffer;
          read = tempRead;

          passIdController(buffer);
        }

        setTimeout(() => { tempRead = ''; }, 1000);
      }
    });
  });
});
