import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { saveBookmark } from '../controller/bookmarkController.js';
import Bookmark from '../models/Bookmark.js';

const router = express.Router();

router.post('/', requireAuth, saveBookmark);

router.get('/', requireAuth, async (req, res) => {
  const list = await Bookmark.find({ user: req.user._id }).sort('-createdAt');
  res.json(list);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await Bookmark.deleteOne({ _id: req.params.id, user: req.user._id });
  res.json({ success: true });
});

export default router;
