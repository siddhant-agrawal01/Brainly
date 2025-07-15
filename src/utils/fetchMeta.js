import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export const fetchMeta = async (url) => {
  const res = await fetch(url);
  const html = await res.text();
  const dom = new JSDOM(html);
  const title = dom.window.document.querySelector('title')?.textContent || '';
  const iconEl = dom.window.document.querySelector('link[rel~="icon"]');
  const favicon = iconEl?.href || new URL('/favicon.ico', url).href;
  return { title, favicon };
};
