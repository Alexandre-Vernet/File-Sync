export interface File {
    name: string;
    date: Date;
}

export interface FileWithId extends File {
    id: string;
}