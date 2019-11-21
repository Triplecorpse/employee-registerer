// @ts-ignore
export const socket = window.io('http://localhost:3000');

socket.on('test', (data: any) => {
  console.log(data);
});
