// 1. config requirejs
const packages = __VAR_JSON__.dependencies
const oldLoad = requirejs.load
requirejs.load = function (context, id, url) {
  if (id in packages) {
    url = packages[id]
  }
  return oldLoad.call(requirejs, context, id, url)
}

// 2. declarations config
// please remove it before sandbox exports.
// api docs:https://github.com/Fronted-TSX-Developer/tsx-editor/blob/master/docs/script.md
if (top !== self) {
  if (!top._finished) {
    top.LOADING.init()
    console.log('--- wait for types fetching... ---')
    const types = __VAR_JSON__.types
    const names = Object.keys(types)
    const count = names.length
    let index = 0
    Promise
      .all(names.map(name =>
        top.api_addModuleDeclaration(types[name], name)
          .then(() => console.log(`type(${++index}/${count}): [${name}] fetched.`))))
      .then(() => {
        console.log('--- types fetching finished. ---')
        top.LOADING.destroy()
      })
    top._finished = true
  }
}

// 3. enjoy it!
console.log(__VAR_JSON__.name, new Date().toLocaleString())
