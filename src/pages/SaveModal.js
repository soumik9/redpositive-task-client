import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

const SaveModal = ({ show, handleClose, setLoading, setShow, refetch }) => {

  
    const [data, setData] = useState({ name: '', email: '', phone: '', hobbies: '' })
    const [error, setError] = useState({ name: '', email: '', phone: '', hobbies: '' })

    const handleSaveData = (e) => {
        e.preventDefault();

        if(data.name ==='' && data.email === '' && data.phone === '' && data.hobbies === ''){
            setError({  name: 'Name filed is required', 
                        email: 'Email filed is required', 
                        phone: 'Phone filed is required', 
                        hobbies: 'Hobbies filed is required' 
                    })
        }else if(data.name ===''){
            setError({ name: 'Name filed is required' })
        }else if(data.email === ''){
            setError({ email: 'Email filed is required' })
        }else if(data.phone === ''){
            setError({ phone: 'Phone filed is required' })
        }else if(data.hobbies === ''){
            setError({ hobbies: 'Hobbies filed is required' })
        }else{
            setLoading(true);
            setError({ name: '', email: '', phone: '', hobbies: '' })

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
    
            fetch('https://repositive-task.herokuapp.com/api/profile/create', requestOptions)
            .then(res => res.json())
            .then(data => {
                refetch();
                setShow(false);
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

    return (
        <Form>
            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Add New Data</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter name" 
                            value={data?.name} onChange={(e) => setData({ ...data, name: e.target.value })} 
                        />
                    </Form.Group>
                    { error.name && <span className='text-danger m-0'>{error.name}</span> }

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            value={data?.email} onChange={(e) => setData({ ...data, email: e.target.value })} 
                        />
                    </Form.Group>
                    { error.email && <span className='text-danger m-0'>{error.email}</span> }

                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter number" 
                            value={data?.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} 
                        />
                    </Form.Group>
                    { error.phone && <span className='text-danger m-0'>{error.phone}</span> }

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
                    { error.hobbies && <span className='text-danger m-0'>{error.hobbies}</span> }
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button className='save-btn' onClick={handleSaveData}> Save </Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
};

export default SaveModal;