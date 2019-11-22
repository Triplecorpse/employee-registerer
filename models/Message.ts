import { TMessage } from '../types/TMessage';
import { IMessage } from '../interfaces/IMesage';

export class Message<T> implements IMessage<T> {
  constructor(public type: TMessage, public payload: T) {
  }
}
