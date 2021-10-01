import {useEffect, useState} from "react";
import {Err, Ok, Result} from "ts-results";
import {Ask, Askee, createAskRequest} from "./models";

const endpoint = process.env.REACT_APP_API_ENDPOINT;

export async function fetchAskees(): Promise<Result<Askee[], Error>> {
    try {
        const resp = await fetch(`${endpoint}/askee`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!resp.ok) {
            return Err(Error(`HTTP 错误 (${resp.status} - ${resp.statusText})`))
        }

        return Ok(await resp.json() as Askee[]);
    } catch (e) {
        if (e instanceof Error) {
            return Err(e)
        }
        throw e;
    }
}

export const useFetchAskees = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [askees, setAskees] = useState<Result<Askee[], Error>>();

    useEffect(() => {
        (async () => {
            setAskees(await fetchAskees());
            setIsLoading(false);
        })();
    }, []);

    return {isLoading, askees};
};

export async function fetchAskee(askeeId: number): Promise<Result<Askee, Error>> {
    try {
        const resp = await fetch(`${endpoint}/askee/${askeeId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!resp.ok) {
            return Err(Error(`HTTP 错误 (${resp.status} - ${resp.statusText})`))
        }

        return Ok(await resp.json() as Askee);
    } catch (e) {
        if (e instanceof Error) {
            return Err(e)
        }
        throw e;
    }
}

export const useFetchAskee = (askeeId: number) => {
    const [isLoading, setIsLoading] = useState(true);
    const [askee, setAskee] = useState<Result<Askee, Error>>();

    useEffect(() => {
        (async () => {
            setAskee(await fetchAskee(askeeId));
            setIsLoading(false);
        })();
    }, [askeeId]);

    return {isLoading, askee};
};

export async function fetchAsk(token: string, askId: number): Promise<Result<Ask, Error>> {
    try {
        const resp = await fetch(`${endpoint}/admin/ask/${askId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-TOKEN': token,
            }
        });

        if (!resp.ok) {
            return Err(Error(`HTTP 错误 (${resp.status} - ${resp.statusText})`))
        }

        return Ok(await resp.json() as Ask);
    } catch (e) {
        if (e instanceof Error) {
            return Err(e)
        }
        throw e;
    }
}

export const useFetchAsk = (token: string, askId: number) => {
    const [isLoading, setIsLoading] = useState(true);
    const [ask, setAsk] = useState<Result<Ask, Error>>();

    useEffect(() => {
        (async () => {
            setAsk(await fetchAsk(token, askId));
            setIsLoading(false);
        })();
    }, [token, askId]);

    return {isLoading, ask};
};

export async function createAsk(token: string, req: createAskRequest): Promise<Result<Ask, Error>> {
    try {
        const resp = await fetch(`${endpoint}/ask`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CAPTCHA-KEY': token,
            },
            body: JSON.stringify(req),
        });

        if (resp.status !== 409 && !resp.ok) {
            return Err(Error(`HTTP 错误 (${resp.status} - ${resp.statusText})`))
        }

        return Ok(await resp.json() as Ask);
    } catch (e) {
        if (e instanceof Error) {
            return Err(e)
        }
        throw e;
    }
}