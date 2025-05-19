import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {
    const user = useLoaderData();
    console.log(user);

    const handleUpdateUser = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const updatedUser = { name, email };
        console.log(updatedUser);

        // Update user in the server
        fetch('http://localhost:3002/users/' + user._id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log('After update user', data);
                    alert('User updated successfully');
                } else {
                    alert('User not updated', data);
                };
            });
    };

    return (
        <div>
            <form onSubmit={handleUpdateUser}>
                <input type="text" name='name' defaultValue={user.name} />
                <br />
                <input type="email" name='email' defaultValue={user.email} />
                <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;