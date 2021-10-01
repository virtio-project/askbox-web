import {useState} from "react";
import {useFetchAsk} from "../fetch";
import {Spinner} from "react-bootstrap";
import './Marshmallow.css';

export interface MarshmallowProps {
    accessToken: string,
    askIds: number[],
}

const Marshmallow = ({accessToken, askIds}: MarshmallowProps) => {

    const [askIndex, setAskIndex] = useState(0);
    const {isLoading, ask} = useFetchAsk(accessToken, askIds[askIndex]);

    return (
        <div className='marshmallow'>
            {
                isLoading &&
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">正在加载……</span>
                </Spinner>
            }
            {
                (!isLoading && ask?.ok) &&
                    <>
                        <span className='index'>{askIndex + 1}</span>
                        <div className='control'>
                            <div className='left' onClick={() => {
                                const decr = askIndex - 1;
                                setAskIndex(decr < 0 ? 0 : decr);
                            }}/>
                            <div className='right' onClick={() => {
                                const incr = askIndex + 1;
                                console.log(ask);
                                setAskIndex(incr > askIds.length - 1 ? askIds.length - 1 : incr);
                            }}/>
                        </div>
                        <div className='inner'>
                            <div className='content'>{ask.val.content}</div>
                        </div>

                        <span className='date'>{ask.val.createdAt}</span>
                    </>
            }
        </div>
    )
};


export default Marshmallow;