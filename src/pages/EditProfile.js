import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { useQuery } from 'react-query';
import Loading from './Shared/Loading';
import toast from 'react-hot-toast';

const EditProfile = () => {

    const navigate = useNavigate();
    const { profileId } = useParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ name: '', email: '', phone: '', hobbies: '' })
    const [error, setError] = useState({ name: '', email: '', phone: '', hobbies: '' })

    // getting specific data by id
    const { data: profile, isLoading } = useQuery(['EditProfile', profileId], () =>
        fetch(`https://repositive-task.herokuapp.com/api/profile/${profileId}`)
            .then(res => res.json()))

    // getting data and set in state
    useEffect(() => {
        if (profile?.success === true) {
            setData({
                name: profile?.profile.name, email: profile?.profile.email, phone: profile?.profile.phone, hobbies: profile?.profile.hobbies
            });
        }
    }, [profile]);

    // update
    const handleUpdate = (e) => {
        e.preventDefault();

        if (data.name === '' && data.email === '' && data.phone === '' && data.hobbies === '') {
            setError({
                name: 'Name filed is required',
                email: 'Email filed is required',
                phone: 'Phone filed is required',
                hobbies: 'Hobbies filed is required'
            })
        } else if (data.name === '') {
            setError({ name: 'Name filed is required' })
        } else if (data.email === '') {
            setError({ email: 'Email filed is required' })
        } else if (data.phone === '') {
            setError({ phone: 'Phone filed is required' })
        } else if (data.hobbies === '') {
            setError({ hobbies: 'Hobbies filed is required' })
        } else {
            setLoading(true);
            setError({ name: '', email: '', phone: '', hobbies: '' })

            fetch(`https://repositive-task.herokuapp.com/api/profile/${profileId}`, {
                method: 'PATCH',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    setLoading(false);
                    setError({ ...error, name: '', email: '', phone: '', hobbies: '' });

                    if (data.success === true) {
                        toast.success(data.message, { duration: 2000, position: 'top-right', });
                    }
                    if (data.success === false) {
                        toast.error(data.message, { duration: 2000, position: 'top-right', });
                    }
                })
        }
    }

    // loading
    if (isLoading || loading) { return <Loading /> }

    return (
        <Form className='my-5'>
            <Container>
                <Row className='justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
                    <Col md={8}>
                        <Card className='py-4 px-3'>

                            <div className="text-center mb-3">
                                <h4>Profile Management</h4>
                            </div>

                            <Card className='py-2 px-1'>
                                <div className='d-flex justify-content-end'>
                                    <Button className='send-btn me-2' onClick={() => navigate('/')}>Home</Button>
                                    <Button className='save-btn' onClick={handleUpdate}>Update</Button>
                                </div>
                            </Card>

                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={data?.name} onChange={(e) => setData({ ...data, name: e.target.value })}
                                />
                            </Form.Group>
                            {error.name && <span className='text-danger m-0'>{error.name}</span>}

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={data?.email} onChange={(e) => setData({ ...data, email: e.target.value })}
                                />
                            </Form.Group>
                            {error.email && <span className='text-danger m-0'>{error.email}</span>}

                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter number"
                                    value={data?.phone} onChange={(e) => setData({ ...data, phone: e.target.value })}
                                />
                            </Form.Group>
                            {error.phone && <span className='text-danger m-0'>{error.phone}</span>}

                            <Form.Group className="mb-3" controlId="hobbies">
                                <Form.Label>Hobbies</Form.Label>
                                <Form.Control
                                    type="text"
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter hobbies"
                                    value={data?.hobbies} onChange={(e) => setData({ ...data, hobbies: e.target.value })}
                                />
                            </Form.Group>
                            {error.hobbies && <span className='text-danger m-0'>{error.hobbies}</span>}

                        </Card>
                    </Col>
                </Row>
            </Container>



        </Form>
    );
};

export default EditProfile;