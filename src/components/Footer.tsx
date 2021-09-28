import {Col, Container, Image, Row} from "react-bootstrap";
import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <Container as="footer" id="footer">
            <Row>
                <Col xs={6} sm={4} md={3} className="logo">
                    <Image src={process.env.PUBLIC_URL + "/logo192.png"}/>
                </Col>
                <Col xs={6} sm={7} md={9} className="description">
                    <div>
                        <p>Powered by virtio.</p>
                        <p><a href="https://beian.miit.gov.cn/">粤ICP备2021129384号</a></p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;