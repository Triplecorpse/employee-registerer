import { TMessage } from '../types/TMessage';

export interface IMessage<T> {
  type: TMessage;
  payload: T;
}
