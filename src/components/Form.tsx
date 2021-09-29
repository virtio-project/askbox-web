import {Button, Form} from "react-bootstrap";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import React, {MouseEvent, useState} from "react";
import {useLocalStorage} from "../utils/localStorage";
import config from "../config";

const SubmitForm = () => {
    const [btnDisable, setBtnDisable] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    // use localStorage to save content
    const [content, setContent] = useLocalStorage("draft", "");
    // TODO: add dedup
    const [dedup, setDedup] = useLocalStorage("dedup", "");

    const submit = (event: MouseEvent<HTMLButtonElement>) => {
        setBtnDisable(true);
        console.log(token);
        console.log(content);
        // TODO: create Ask
        setBtnDisable(false);
        setContent(""); // clear localStorage
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
                        setContent(event.target.value);
                    }}
                    value={content}
                />
            </Form.Group>
            <HCaptcha
                sitekey={config.sitekey}
                onVerify={(token) => {
                    setToken(token);
                    setBtnDisable(false);
                }}
            />
            <Button variant="primary" onClick={submit} disabled={btnDisable}>
                Biu~
            </Button>
        </Form>
    );
}

export default SubmitForm;