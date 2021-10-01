import {useLocation} from "react-router-dom";
import {useParams} from "react-router";
import Marshmallow from "../components/Marshmallow";

const Obs = () => {
    const {accessToken} = useParams<{accessToken: string}>();
    const query = new URLSearchParams(useLocation().search);
    const askIds = query.get("asks");

    if (askIds == null) return <InvalidObs/>;
    const askIdsParsed = JSON.parse(askIds) as number[];
    if (askIdsParsed.length === 0) return <InvalidObs/>;

    return <Marshmallow accessToken={accessToken} askIds={askIdsParsed}/>;
};

const InvalidObs = () => {
    return (
        <>
        </>
    )
}

export default Obs;