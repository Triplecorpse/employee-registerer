export interface IMessage<T = any> {
    type: "hardware" | "visitor" | "passid" | "student";
    payload: T
}
