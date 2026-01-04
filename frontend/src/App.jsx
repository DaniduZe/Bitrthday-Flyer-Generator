import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import UserList from './components/UserList.jsx'
import UserForm from './components/UserForm.jsx'

export default function App() {
  const nav = useNavigate();
  return (
    <div className="container">
      <header>
        <h1>🎉 Birthday Flyer Admin</h1>
        <nav>
          <Link to="/">Users</Link>
          <button onClick={() => nav('/add')}>+ Add User</button>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<UserForm />} />
        <Route path="/edit/:id" element={<UserForm />} />
      </Routes>
    </div>
  )
}
