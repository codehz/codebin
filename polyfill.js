const head = document.head;
window.loadCSS = function(file, path) {
  const csspath = path.substr(0, path.lastIndexOf("/")) + file.substr(1);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = csspath;
  head.appendChild(link);
}
window.require = async function (paths, callback) {
  callback.apply(null, await Promise.all(paths.map(x => import(`/${x}.js`))));
}
