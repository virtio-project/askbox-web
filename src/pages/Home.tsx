import {Link} from "react-router-dom";
import {useFetchAskees} from "../fetch";
import {Alert, Spinner} from "react-bootstrap";
const Home = () => {

    const {isLoading, askees} = useFetchAskees();

    return (
        <>
            {
                isLoading &&
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">正在发送……</span>
                </Spinner>
            }
            {
                askees?.err &&
                <Alert variant={'danger'}>
                    <p>加载失败，刷新页面重试。</p>
                </Alert>
            }
            {
                askees?.ok &&
                    askees.val.map((askee) => <Link to={`/askee/${askee.id}/ask`}>向{askee.displayName}提问</Link>)
            }
        </>
    );
}

export default Home;