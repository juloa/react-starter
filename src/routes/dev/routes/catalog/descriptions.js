const req = require.context("react-starter/src/react-toolbox/lib/", true, /descript\.js$/)
const req2 = require.context("react-starter/src/components/", true, /descript\.js$/)

function filterEmptyObjects(obj) {

  for (const n in obj) {

    if (obj.hasOwnProperty(n)) return true

  }

  return false

}

const descriptions = req.keys()
  .map(data => { return req(data).default })
  .filter(filterEmptyObjects)
const descriptions2 = req2.keys()
  .map(data => { return req2(data).default })
  .filter(filterEmptyObjects)

module.exports = [...descriptions, ...descriptions2]
