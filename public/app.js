const routes = {
  '/': {
    title: 'Home',
    html: `
      <p>This is a tiny client-side router demo. Try the links above or open
      <a href="/about">/about</a> directly — the URL stays clean thanks to branch-level
      <code>404.html</code> SPA fallback.</p>
    `,
  },
  '/about': {
    title: 'About',
    html: `
      <p>Built to exercise the static hosting platform:</p>
      <ul>
        <li>Production deploy on <code>main</code></li>
        <li>Branch previews on pull requests</li>
        <li>History-based SPA routing</li>
      </ul>
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
