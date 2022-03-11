export interface Media {
    name: string;
    url: string;
    type: string;
    date: Date;
}

export interface MediaWithId extends Media {
    id: string;
}