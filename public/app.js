const ARTICLE_URL = 'https://oleksiipopov.com/blog/static-hosting-for-vibe-coders/';
const ARTICLE_TITLE = 'Static hosting for vibe coders: one platform, many demo apps';

const routes = {
  '/': {
    title: 'Home',
    html: `
      <p>This is a tiny client-side router demo. Try the links above or open
      <a href="/about">/about</a> directly — the URL stays clean thanks to branch-level
      <code>404.html</code> SPA fallback.</p>
      <p>Background:
      <a href="${ARTICLE_URL}" rel="noopener noreferrer" target="_blank">${ARTICLE_TITLE}</a>.</p>
    `,
  },
  '/about': {
    title: 'About',
    html: `
      <p>Built to exercise the
      <a href="https://github.com/AlexeyPopovUA/static-hosting-for-vibe-coders" rel="noopener noreferrer" target="_blank">static hosting platform</a>:</p>
      <ul>
        <li>Production deploy on <code>main</code></li>
        <li>Branch previews on pull requests</li>
        <li>History-based SPA routing</li>
      </ul>
      <p>Architecture and requirements:
      <a href="${ARTICLE_URL}" rel="noopener noreferrer" target="_blank">${ARTICLE_TITLE}</a>.</p>
    `,
  },
  '/status': {
    title: 'Status',
    html: `
      <dl>
        <dt>Hostname</dt><dd>${location.hostname}</dd>
        <dt>Path</dt><dd>${location.pathname}</dd>
        <dt>Deployed</dt><dd>${new Date(document.lastModified).toISOString()}</dd>
      </dl>
    `,
  },
};

function render(pathname) {
  const route = routes[pathname] ?? routes['/'];
  document.getElementById('title').textContent = route.title;
  document.getElementById('content').innerHTML = route.html;

  for (const link of document.querySelectorAll('[data-route]')) {
    const active = link.dataset.route === pathname;
    link.toggleAttribute('aria-current', active ? 'page' : false);
  }
}

function navigate(pathname) {
  history.pushState({ pathname }, '', pathname);
  render(pathname);
}

document.getElementById('host').textContent = location.hostname;

document.querySelector('.nav').addEventListener('click', (event) => {
  const link = event.target.closest('[data-route]');
  if (!link) return;
  event.preventDefault();
  navigate(link.dataset.route);
});

window.addEventListener('popstate', () => {
  render(location.pathname);
});

render(location.pathname);
