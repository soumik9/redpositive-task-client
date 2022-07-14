import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useQuery } from 'react-query';
import ProfileTable from './ProfileTable';
import SaveModal from './SaveModal';
import Loading from './Shared/Loading';

const Home = () => {

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

     // get data
     const { data, isLoading, refetch } = useQuery(['profiles'], () =>
     fetch(`https://repositive-task.herokuapp.com/api/profile/index`, {
         headers: {
             'content-type': 'application/json',
             authorization: `Bearer ${localStorage.getItem('accessToken')}`
         }
     })
    .then(res => res.json() ))

    console.log(data);

    if(loading || isLoading){ <Loading /> }

    return (
        <div className='my-5'>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={8}>
                        <Card className='py-4 px-3'>
                            
                            <Card className='py-2 px-4'>
                                <Row className='justify-content-end'>
                                    <Col md={1}><Button>Send</Button></Col>
                                    <Col md={1}><Button onClick={handleShow}>Save</Button></Col>
                                </Row>
                             
                            </Card>

                            {/* table */}
                            <ProfileTable datas={data?.profiles} />
                        </Card>
                    </Col>
                </Row>
            </Container>

            <SaveModal show={show} handleClose={handleClose} setShow={setShow} setLoading={setLoading} refetch={refetch} />

        </div>
    );
};

export default Home;