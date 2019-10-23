import {IMessage} from "../interfaces/IMesage";

class Socket {
    onopen: Promise<Event>;
    private socket: WebSocket;
    private subscriber: {filter: string; executor: (message: IMessage) => void};

    constructor() {
        this.socket = new WebSocket('/connect', 'ws');
        this.onopen = new Promise<Event>((res) => {
            this.socket.onopen = (event) => {
                res(event);
            }
        });
        this.socket.onmessage = (message: any) => {
            if (this.subscriber && message.type === this.subscriber.filter) {
                this.subscriber.executor(message.payload);
            }
        }
    }

    onmessage<T>(filter: string, cb: (message: IMessage<T>) => void) {
        this.subscriber = {filter, executor: cb};
    }

    private initialize() {
    }
}

export const socket = new Socket();
