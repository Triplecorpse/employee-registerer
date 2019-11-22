// @ts-ignore
export const socket = window.io('http://localhost:3000');

socket.on('connect', (data: any) => {
  if (socket.connected) {
    console.log('Socket successfully connected');
  } else {
    console.log('Socket successfully disconnected');
  }
});
