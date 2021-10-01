import {Col, Container, Row} from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './App.css';
import NavBar from "./components/Nav";
import Footer from "./components/Footer";
import SubmitForm from "./components/Form";
import Home from "./pages/Home";

function App() {
    return (
        <Router>
            <NavBar/>
            <Container fluid="xl" className="container content">
                <Row as="main" className="main">
                    <Col xs={12} sm={11} md={9} lg={8}>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/askee/:askeeId([1-9]\d*)/ask" component={SubmitForm} />
                            <Route exact path="*">404 - 页面未找到</Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Router>
    );
}

export default App;
