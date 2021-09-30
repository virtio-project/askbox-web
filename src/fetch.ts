import {useEffect, useState} from "react";
import {Err, Ok, Result} from "ts-results";
import {Ask, Askee, createAskRequest} from "./models";

const endpoint = process.env.REACT_APP_API_ENDPOINT;

export async function fetchAskees(): Promise<Result<Askee[], Error>> {
    try {
        const resp = await fetch(`${endpoint}/askee`);

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

export async function createAsk(token: string, req: createAskRequest): Promise<Result<Ask, Error>> {
    try {
        const resp = await fetch(`${endpoint}/ask`, {
            method: 'POST',
            headers: {
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