import Form from "../components/Form";
import {useParams} from "react-router";
import {useFetchAskee} from "../fetch";
import {Alert, Spinner} from "react-bootstrap";

const PostAsk = () => {

    const { askeeId } = useParams<{askeeId: string}>();
    const { isLoading, askee } = useFetchAskee(parseInt(askeeId));

    return (
        <>
            {
                isLoading &&
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">正在加载……</span>
                </Spinner>
            }
            {
                (!isLoading && askee?.err) &&
                <Alert variant={'danger'}>
                    <p>加载失败，刷新页面重试。</p>
                </Alert>
            }
            {
                (!isLoading && askee?.ok) &&
                <Form askee={askee.val}/>
            }
        </>
    );
}

export default PostAsk;