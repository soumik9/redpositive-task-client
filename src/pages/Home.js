import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import ProfileTable from './ProfileTable';
import SaveModal from './SaveModal';
import Loading from './Shared/Loading';

const Home = () => {

    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // get datas
    const { data, isLoading, refetch } = useQuery(['profiles'], () =>
        fetch(`https://repositive-task.herokuapp.com/api/profile/index`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json()))

    const handleSend = (e) => { 
        e.preventDefault();

        if(checked.length < 1){
            toast.success(`No checked data`, { duration: 2000, position: 'top-right' });
        }else{
            setLoading(true);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(checked)
            };
    
            fetch('https://repositive-task.herokuapp.com/api/mail', requestOptions)
            .then(res => res.json())
            .then(data => {
                refetch()
                setLoading(false);
                if (data.success === true) {
                    toast.success(`${data.message}`, { duration: 2000, position: 'top-right' });
                }
                if (data.success === false) {
                    toast.error(`${data.message}`, { duration: 2000, position: 'top-right' });
                }
            });
        }
    }      
    
    // loading
    if (loading || isLoading) { <Loading /> }

    return (
        <div className='my-5'>
            <Container>
                <Row className='justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
                    <Col md={8}>
                        <Card className='py-4 px-3'>

                            <div className="text-center mb-3">
                                <h4>Profile Management</h4>
                            </div>

                            {/* header */}
                            <Card className='py-2 px-1'>
                                <div className='d-flex justify-content-end'>
                                    <Button className='me-2 send-btn' onClick={handleSend}>Send</Button>
                                    <Button className='save-btn' onClick={handleShow}>Save</Button>
                                </div>
                            </Card>

                            {/* table */}
                            <ProfileTable 
                                datas={data?.profiles} 
                                setLoading={setLoading} 
                                refetch={refetch} 
                                checked={checked} 
                                setChecked={setChecked} 
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* modal */}
            <SaveModal show={show} handleClose={handleClose} setShow={setShow} setLoading={setLoading} refetch={refetch} />

        </div>
    );
};

export default Home;