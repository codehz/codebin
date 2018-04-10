export default {
  '/': () => render => render`
  <img id=logo src=/codebin.svg>
  <div id=index-container>
    <a href=/new>New</a>
    <a href=/about>About</a>
  </div>
  `
}
