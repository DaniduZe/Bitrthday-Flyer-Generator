import React, { useEffect, useRef, useState } from 'react'
import api, { API_BASE } from '../api'
import { useNavigate, useParams } from 'react-router-dom'

export default function UserForm() {
  const { id } = useParams()
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', dob: '' })
  const [preview, setPreview] = useState('')
  const fileRef = useRef()

  useEffect(() => {
    if (id) {
      api.get(`/users/${id}`).then(res => {
        const u = res.data
        setForm({ name: u.name, email: u.email, dob: u.dob?.slice(0,10) })
        setPreview(u.pictureUrl ? `${API_BASE}${u.pictureUrl}` : '')
      })
    }
  }, [id])

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('email', form.email)
    fd.append('dob', form.dob)
    if (fileRef.current?.files[0]) fd.append('picture', fileRef.current.files[0])
    if (id) await api.put(`/users/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    else await api.post('/users', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    nav('/')
  }

  const onFile = (e) => {
    const f = e.target.files[0]
    if (f) {
      const url = URL.createObjectURL(f)
      setPreview(url)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Name</label>
        <input name="name" value={form.name} onChange={onChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={onChange} required />
      </div>
      <div>
        <label>Date of Birth</label>
        <input type="date" name="dob" value={form.dob} onChange={onChange} required />
      </div>
      <div>
        <label>Picture</label>
        <input type="file" accept="image/*" ref={fileRef} onChange={onFile} />
        {preview && <div style={{marginTop: 8}}><img src={preview} style={{width: 140, height: 140, objectFit: 'cover', borderRadius: 12}} /></div>}
      </div>
      <div>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </div>
    </form>
  )
}
