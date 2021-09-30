export interface Ask {
    id: number,
    askee: number,
    content: string,
    createdAt: string | null | undefined,
    dedup: string,
}

export interface Askee {
    id: number,
    displayName: string,
    createdAt: string | null | undefined,
}

export interface createAskRequest {
    askee: number,
    content: string,
    dedup: string,
}
