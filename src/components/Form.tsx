import {Button, Form, Spinner} from "react-bootstrap";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {useState} from "react";
import {useLocalStorage} from "../utils/localStorage";
import {createAsk} from "../fetch";
import {Askee} from "../models";

const randomToken = (nBytes: number) => {
    const buf = new Uint8Array(nBytes);
    window.crypto.getRandomValues(buf);
    return [...buf].map(b => b.toString(16).padStart(2, '0')).join('');
}

export interface SubmitFormProps {
    askee: Askee
}

const SubmitForm = (props: SubmitFormProps) => {
    const [token, setToken] = useState<string | null>(null);
    const [isPosting, setIsPosting] = useState(false);
    // use localStorage to save content
    const [content, setContent] = useLocalStorage("draft", "");
    // TODO: add dedup
    const [dedup, setDedup] = useLocalStorage("dedup", randomToken(16));

    const submit = async () => {
        setIsPosting(true);
        if (token == null) {
            alert(`发送错误: hCAPTCHA token 为空`);
            return;
        } else {
            const result = await createAsk(token, {
                askee: props.askee.id,
                content: content,
                dedup: dedup,
            });
            if (result.ok) {
                alert("问题发送成功！")
            } else {
                alert(`发送错误: ${result.val.message}`);
            }
            setContent(""); // clear localStorage
        }
        setIsPosting(false);
        // TODO: display a message
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>你想对{props.askee.displayName}说什么捏～</Form.Label>
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
                sitekey={process.env.REACT_APP_SITE_KEY!!}
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