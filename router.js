import hyper from '/hyperHTML/index.js'
import {loadComponent} from '/utils.js'

const data = {
  '/': () => render => render`
  <img id=logo src=/codebin.svg>
  <div id=index-container onclick=${event => {
    event.preventDefault();
    if (event.target.href) router(new URL(event.target.href).pathname, true);
  }}>
    <a href=/new>New</a>
    <a href=/about>About</a>
  </div>
  `,
  '/new': () => render => router(`/pen/${Math.random().toString(36).substr(2, 5)}${Math.random().toString(36).substr(2, 5)}`),
  '/pen/(.+)': penid => async render => render`
  <div id=workspace data=${penid}>
    <header data-penid=${penid}>
    </header>
    <aside class="file-manager" onconnected=${await loadComponent('file-manager')}>
    </aside>
    <article onconnected=${await loadComponent('tabview')}>
    </article>
    <footer onconnected=${await loadComponent('status')}>
    </footer>
  </div>
  `
}

function matched(path) {
  return ([name]) => new RegExp(`^${name}$`).test(path);
}

export default async function router(path, push = false, rev = false) {
  if (!rev) window.history[push ? 'pushState' : 'replaceState'](null, null, path);
  const result=Object.entries(data).find(matched(path));
  if (!result) return window.history.back();
  const [matchedRegExpString,matchedRouter] = result;
  const groups = new RegExp(`^${matchedRegExpString}$`).exec(location.pathname).slice(1);
  await (matchedRouter.apply(null, groups))(hyper(document.querySelector('#root')));
}
window.onpopstate = function () {
  router(location.pathname, false, true);
}
