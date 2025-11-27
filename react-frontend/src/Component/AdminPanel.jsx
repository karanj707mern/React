import React, { useState, useEffect } from 'react';
import '../Styles/AdminPanel.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (userRole !== 'admin') {
      setError('You do not have permission to access this page');
      return;
    }
    fetchAllUsers();
  }, [userRole]);

  const fetchAllUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/user/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`http://localhost:5000/user/${userId}/role`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      const data = await response.json();
      setSuccess(`${data.user.email} is now a ${newRole}`);
      
      // Update local state
      setUsers(users.map(u => 
        u._id === userId ? { ...u, role: newRole } : u
      ));

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Error updating role');
    }
  };

  if (userRole !== 'admin') {
    return (
      <div className="admin-panel">
        <div className="admin-error">
          <h2>Access Denied</h2>
          <p>You do not have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <h1>Admin Panel</h1>
        
        {error && <div className="admin-alert error">{error}</div>}
        {success && <div className="admin-alert success">{success}</div>}

        {loading ? (
          <div className="loading">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="no-users">No users found</div>
        ) : (
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Current Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      {user.role === 'admin' ? (
                        <button
                          className="btn btn-demote"
                          onClick={() => handleRoleChange(user._id, 'user')}
                        >
                          Demote to User
                        </button>
                      ) : (
                        <button
                          className="btn btn-promote"
                          onClick={() => handleRoleChange(user._id, 'admin')}
                        >
                          Promote to Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button className="btn btn-refresh" onClick={fetchAllUsers}>
          Refresh Users
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
