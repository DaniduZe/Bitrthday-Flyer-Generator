import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api, { API_BASE } from '../api'

export default function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const res = await api.get('/users')
    setUsers(res.data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const onDelete = async (id) => {
    if (!confirm('Delete this user?')) return;
    await api.delete(`/users/${id}`)
    await load()
  }

  return (
    <div>
      {loading ? <p>Loading...</p> : users.map(u => (
        <div className="card" key={u._id}>
          <img src={u.pictureUrl ? `${API_BASE}${u.pictureUrl}` : 'https://via.placeholder.com/72'} alt={u.name} />
          <div>
            <div><strong>{u.name}</strong></div>
            <div>{u.email}</div>
            <div>DOB: {new Date(u.dob).toLocaleDateString()}</div>
          </div>
          <div className="actions">
            <Link to={`/edit/${u._id}`}><button>Edit</button></Link>
            <button onClick={() => onDelete(u._id)}>Delete</button>
          </div>
        </div>
      ))}
      {!loading && users.length === 0 && <p>No users yet. Click “+ Add User”.</p>}
    </div>
  )
}
