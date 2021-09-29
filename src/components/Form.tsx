import {Button, Form, Spinner} from "react-bootstrap";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import React, {MouseEvent, useState} from "react";
import {useLocalStorage} from "../utils/localStorage";
import config from "../config";

const randomToken = (nBytes: number) => {
    const buf = new Uint8Array(nBytes);
    window.crypto.getRandomValues(buf);
    return [...buf].map(b => b.toString(16).padStart(2, '0')).join('');
}

const SubmitForm = () => {
    const [token, setToken] = useState<string | null>(null);
    const [isPosting, setIsPosting] = useState(false);
    // use localStorage to save content
    const [content, setContent] = useLocalStorage("draft", "");
    // TODO: add dedup
    const [dedup, setDedup] = useLocalStorage("dedup", randomToken(16));

    const submit = async (event: MouseEvent<HTMLButtonElement>) => {
        setIsPosting(true);
        try {
            if (token == null) throw new Error("hCAPTCHA token 为空");
            const resp = await fetch(`${config.apiEndpoint}/ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CAPTCHA-KEY': token,
                },
                body: JSON.stringify({
                    askee: 1,
                    content: content,
                    dedup: dedup,
                }),
            });
            if (resp.status != 409 && !resp.ok)
                throw new Error(`HTTP 错误 (${resp.status} - ${resp.statusText})`)
            alert("问题发送成功！")
            setContent(""); // clear localStorage
        } catch (err) {
            if (err instanceof Error)
                alert(`发送错误: ${err.message}`);
        } finally {
            setIsPosting(false);
        }
        // TODO: display a message
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>你想说什么捏～</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={10}
                    onChange={(event) => {
                        setContent(event.currentTarget.value);
                        setDedup(randomToken(16));
                    }}
                    value={content}
                />
            </Form.Group>
            <HCaptcha
                sitekey={config.sitekey}
                onVerify={setToken}
            />
            <Button variant="primary" onClick={submit} disabled={token == null || isPosting || !content}>
                Biu~
                { isPosting &&
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">正在发送……</span>
                    </Spinner>
                }
            </Button>
        </Form>
    );
}

export default SubmitForm;