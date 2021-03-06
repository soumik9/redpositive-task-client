import React from 'react';
import { Button, Form, Table } from 'react-bootstrap'
import { BiEdit } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import toast from 'react-hot-toast';

const ProfileTable = ({ datas, setLoading, refetch, checked, setChecked }) => {

    const navigate = useNavigate();

    // navigate to edit data
    const handleEdit = (dataId) => {
        navigate(`/${dataId}`)
    }

    // data deleting
    const handleDelete = (dataId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                setLoading(true);
                const deleteDataConfirm = async () => {
                    fetch(` https://repositive-task.herokuapp.com/api/profile/${dataId}`, {
                        method: 'DELETE',
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success === true) {
                                toast.success(data.message, { duration: 2000, position: 'top-right', });
                            }
                            if (data.success === false) {
                                toast.error(data.message, { duration: 2000, position: 'top-right', });
                            }

                            refetch();
                            setLoading(false);
                        })
                }
                deleteDataConfirm();
            }
        });
    }

     // Add/Remove checked item from list
     const checkHandler = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>Checkbox</th>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    datas?.map((data, index) => <tr key={data._id}>
                        <td className='text-center'>   
                            <Form.Group className="mb-3" controlId="checkProfile">
                                <Form.Check type="checkbox" value={data._id} onClick={checkHandler} />
                            </Form.Group>
                        </td>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.phone}</td>
                        <td>
                            <Button variant='warning' className='me-2 px-1 pt-0 text-white'
                                onClick={() => handleEdit(data._id)}><BiEdit />
                            </Button>
                            <Button variant='danger' className='px-1 pt-0 text-white'
                                onClick={() => handleDelete(data._id)}><AiOutlineDelete />
                            </Button>
                        </td>
                    </tr>)
                }
            </tbody>
        </Table>
    );
};

export default ProfileTable;