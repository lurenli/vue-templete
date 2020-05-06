const modulesContext = require.context('./', true, /\.js$/)
let API = {}
const chunks = modulesContext.keys().reduce((modules, key) => {
  if (key !== './index.js') {
    let keyName = key.replace(/^\.\/(.+)\.js/, '$1');
    // API[keyName] = modulesContext(key).default;
    API[keyName] = modulesContext(key);
    //API = {...API, ...modulesContext(key).default}
  }
  return API
}, {})

export default {
  ...chunks
}