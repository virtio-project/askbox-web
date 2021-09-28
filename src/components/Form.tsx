import {Button, Form} from "react-bootstrap";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import React, {MouseEvent, useState} from "react";
import {useLocalStorage} from "../utils/localStorage";
import config from "../config";

const SubmitForm = () => {
    const [btnDisable, setBtnDisable] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [content, setContent] = useLocalStorage("draft", "");

    const submit = (event: MouseEvent<HTMLButtonElement>) => {
        console.log(token);
        console.log(content);
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