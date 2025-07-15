import fetch from 'node-fetch';
import Bookmark from '../models/Bookmark.js';
import { getMetadataFromURL } from '../utils/metadata.js';

const fetchSummary = async (url) => {
  try {
    const encodedUrl = encodeURIComponent(url);
    const res = await fetch(`https://r.jina.ai/http://${encodedUrl}`);
    const summaryText = await res.text();
    // Trim summary to ~1000 chars max for UX
    return summaryText.length > 1000
      ? summaryText.slice(0, 1000) + '...'
      : summaryText;
  } catch (err) {
    console.error('Jina Summary Error:', err.message);
    return 'Summary temporarily unavailable.';
  }
};

export const saveBookmark = async (req, res) => {
  const { url } = req.body;
  const userId = req.user.id;

  try {
    const { title, favicon } = await getMetadataFromURL(url);
    const summary = await fetchSummary(url);

    const bookmark = new Bookmark({ url, title, favicon, summary, user: userId });
    await bookmark.save();

    res.status(201).json(bookmark);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to save bookmark.' });
  }
};
