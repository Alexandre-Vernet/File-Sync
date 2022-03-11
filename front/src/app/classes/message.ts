export interface Message {
    message: string;
    date: Date
}

export interface MessageWithId extends Message {
    id: string;
}
