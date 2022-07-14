import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';

const Loading = ({ getHeight }) => {
    return (
        <Container>
            <Row className='justify-content-center align-items-center' 
                style={{ height: getHeight !== undefined? getHeight: '100vh'}}
            >
                <Spinner animation="border" variant="info" />
            </Row>
        </Container>
    );
};

export default Loading;