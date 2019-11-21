import { TMessage } from './TMessage';

export interface IMessage<T> {
  type: TMessage;
  payload: T;
}
