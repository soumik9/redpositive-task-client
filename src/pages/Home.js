import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import ProfileTable from './ProfileTable';

const Home = () => {
    return (
        <div className='my-5'>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={8}>
                        <Card className='py-4 px-3'>
                            
                            <Card className='py-2 px-4'>
                                <Row className='justify-content-end'>
                                    <Col md={1}><Button>Send</Button></Col>
                                    <Col md={1}><Button>Save</Button></Col>
                                </Row>
                             
                            </Card>

                            {/* table */}
                            <ProfileTable />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;