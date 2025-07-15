import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import Bookmark from '../models/Bookmark.js';
import { fetchMeta } from '../utils/fetchMeta.js';

const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
  const { url } = req.body;
  const { title, favicon } = await fetchMeta(url);
  const bookmark = await Bookmark.create({
    user: req.user._id,
    url, title, favicon, summary: ''
  });
  res.json(bookmark);
});

router.get('/', requireAuth, async (req, res) => {
  const list = await Bookmark.find({ user: req.user._id }).sort('-createdAt');
  res.json(list);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await Bookmark.deleteOne({ _id: req.params.id, user: req.user._id });
  res.json({ success: true });
});

export default router;
