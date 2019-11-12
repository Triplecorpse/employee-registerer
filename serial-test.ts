import { init } from 'raspi';
import { Serial } from 'raspi-serial';

init(() => {
  const serial = new Serial();
  const parts: Array<Buffer> = [];
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

          detailed(buffer);
        }

        setTimeout(() => { tempRead = ''; }, 1000);
      }
    });
  });
});

function detailed(buff: Buffer) {
  const tag = parseInt(buff.slice(3, 11).toString(), 16).toString(10);
  const zeroes = 10 - tag.length;

  //console.log('total', buff)
  //console.log('head', buff.slice(0, 1));
  //console.log('version', buff.slice(1, 3).toString());
  console.log('tag', '0'.repeat(zeroes) + tag);
  //console.log('checksum', buff.slice(11, 13).toString());
  //console.log('tail', buff.slice(13))
}
