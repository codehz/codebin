import ST from '/ST.js'
import router from '/router.js'
import hyper from '/hyperHTML/index.js'

function matched(path) {
  return ([name]) => new RegExp(`^${name}$`).test(path);
}
function main() {
  const result=Object.entries(router).find(matched(location.pathname));
  if (!result) return location.replace('/')
  const [matchedRegExpString,matchedRouter] = result;
  const groups = new RegExp(`^${matchedRegExpString}$`).exec(location.pathname).slice(1);
  matchedRouter.apply(groups)(hyper(document.querySelector('#root')));
}
main();
