import User from '../models/User.js';

export async function listUsers(req, res) {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.json(users);
}

export async function getUser(req, res) {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
}

export async function createUser(req, res) {
  const { name, email, dob } = req.body;
  const pictureUrl = req.file ? `/${req.file.path}` : '';
  const user = await User.create({ name, email, dob, pictureUrl });
  res.status(201).json(user);
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, dob } = req.body;
  const changes = { name, email, dob };
  if (req.file) changes.pictureUrl = `/${req.file.path}`;
  const user = await User.findByIdAndUpdate(id, changes, { new: true });
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
}

export async function removeUser(req, res) {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ ok: true });
}
