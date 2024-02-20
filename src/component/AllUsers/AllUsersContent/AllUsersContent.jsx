import React, { useEffect, useState } from 'react';
import Style from './AllUsersContent.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function AllUsersContent() {
  let token = localStorage.getItem('userToken');
  let [users, setUsers] = useState([]);
  let [search, setSearch] = useState('');

  async function displayusers() {
    let { data } = await axios.get('https://mais-gaduation.onrender.com/user/getAllUsers', {
      headers: { Authorization: `Mais__Hi${token}` }
    });
    setUsers(data.users);
  }

  const handleUserClick = (user) => {
    Swal.fire({
      title: "User's Info",
      text: `${user.firstName} ${user.lastName} - ${user.email}`,
      showCancelButton: true,
      confirmButtonColor: " rgb(130, 93, 165)",
      cancelButtonColor: "black",
      confirmButtonText: "Delete user!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser(user._id); // Pass user._id to deleteUser
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  async function deleteUser(userId) {
    console.log(userId);
    let { data } = await axios.patch(`https://mais-gaduation.onrender.com/user/softDeleteUser/${userId}`, null, {
      headers: { Authorization: `Mais__Hi${token}` }
    });
    // Additional logic after deleting the user, if needed
  }
  useEffect(() => {
    displayusers();
  }, [token]);

  return (
    <div className={Style.super}>
      <h1 className={Style.head}>All Users</h1>
      <div className={Style.Content}>
        <ul className={Style.users}>
        <input type='search' name='pname' className={Style.search} style={{width:'66rem',padding:'1% 2%',borderRadius:'5px',marginBottom:'2%'}} placeholder='Please seach by name' valye={search} onChange={(e)=>{setSearch(e.target.value)}}/>
        {users.length > 0 ? (
 users.filter((element) => {
    const lowercaseSearch = search.toLowerCase();
    if (search === '') {
      return element;
    } else if (element.firstName.toLowerCase().includes(lowercaseSearch)) {
      return element;
    }
  }).map((user, index) => (
      <li className={Style.list} key={user._id}>
        <Link className={Style.link} onClick={() => handleUserClick(user)}>
          {index + 1}. {user.firstName} {user.lastName}
        </Link>
        <span className='mx-1'> {user.status}</span>
      </li>
    ))
) : (
  <li>No users available</li>
)}

        </ul>
      </div>
    </div>
  );
}
