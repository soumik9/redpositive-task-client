import React from 'react';
import { Button, Table } from 'react-bootstrap'
import { BiEdit } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'

const ProfileTable = ({ datas }) => {
    return (
        <Table responsive>
            <thead>
                <tr>
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
                        <td>{ index + 1 }</td>
                        <td>{ data.name }</td>
                        <td>{ data.email }</td>
                        <td>{ data.phone }</td>
                        <td>
                            <Button variant='warning' className='me-2 px-1 pt-0 text-white'><BiEdit /></Button>
                            <Button variant='danger' className='px-1 pt-0 text-white'><AiOutlineDelete /></Button>
                        </td>
                    </tr>)
                }


            </tbody>
        </Table>
    );
};

export default ProfileTable;