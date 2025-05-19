import React, { use, useState } from 'react';
import { Link } from 'react-router';

const Users = ({ usersPromise }) => {
    const initialUsers = use(usersPromise);
    const [users, setUsers] = useState(initialUsers);

    const handleAddUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const newUser = { name, email };
        console.log(newUser);

        // Create a new user in the DB:
        fetch('http://localhost:3002/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Data after creating in DB', data);
                if (data.acknowledged) {
                    alert('User created successfully');

                    // Update the users state with the new user:
                    newUser._id = data.insertedId;
                    const newUsers = [...users, newUser];
                    setUsers(newUsers);

                    // Reset the form:
                    form.reset();
                }
            });
    };

    const handleDeleteUser = (id) => {
        console.log('Deleting user with id:', id);

        // Delete the user from the DB:
        fetch(`http://localhost:3002/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    // Update the users state by filtering out the deleted user:
                    const remainingUsers = users.filter(user => user._id !== id);
                    setUsers(remainingUsers);
                    console.log('Data after deleting from DB', remainingUsers);
                }
            });
    }

    return (
        <>
            <form onSubmit={handleAddUser}>
                <input type="text" name='name' />
                <br />
                <input type="email" name='email' />
                <br />
                <input type="submit" value="submit" />
            </form>
            <div>
                <h3>Users : {users.length}</h3>
                {
                    users.map(user => <p key={user._id}>
                        userName: {user.name} <br />
                        userEmail: {user.email} <br />
                        <button style={{ marginRight: '10px'}}><Link to={`users/${user._id}`}>Details</Link></button>
                        <button style={{ marginRight: '10px' }}><Link to={`update/${user._id}`}>Edit</Link></button>
                        <button onClick={() => handleDeleteUser(user._id)}>X</button>
                    </p>)
                }
            </div>
        </>
    );
};

export default Users;