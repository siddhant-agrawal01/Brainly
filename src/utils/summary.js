import fetch from 'node-fetch';

export async function generateSummary(url) {
  const resp = await fetch(`https://api.jina.ai/endpoint?url=${encodeURIComponent(url)}`);
  const data = await resp.json();
  return data.summary || '';
}
