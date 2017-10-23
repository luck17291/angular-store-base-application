export enum MessageType {
    Error,
    Success,
    Warning,
    Info
}
export interface Message {
    type: MessageType,
    content: string
}