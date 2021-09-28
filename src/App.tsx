import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import './App.css';
import NavBar from "./components/Nav";
import Footer from "./components/Footer";
import SubmitForm from "./components/Form";

function App() {
    return (
        <>
            <NavBar/>
            <Container fluid="xl" className="container">
                <Row as="main" className="main">
                    <Col xs={12} sm={11} md={9} lg={8}>
                        <SubmitForm/>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    );
}

export default App;
