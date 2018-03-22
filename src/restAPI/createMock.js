import Chance from "chance"

const chance = new Chance()

function makeResponse(objResponse, status = 200) {

  const body = (objResponse && JSON.stringify(objResponse)) || undefined

  return new Response(body, { status })
}

const nbResults = 20

export default function createMock(list) {

  return [{

    path : "",

    handler(request) {

      const { query } = request

      const page = Number(query.page) || 1

      delete query.page

      let selected = list

      for (const key in query) {

        const regexp = new RegExp(query[key], "i")

        selected = selected.filter(item => regexp.test(item[key]))
      }

      const baseUrl = this.baseUrl

      function makeUrl(newPage) {

        const url = new URL(baseUrl)

        for (const key in query) {
          if (key !== "page") url.searchParams.append(key, query[key])
        }

        url.searchParams.append("page", newPage)

        return url.toString()
      }

      return {
        count : selected.length,
        next : page * nbResults < selected.length ? makeUrl(page + 1) : null,
        previous : page > 1 ? makeUrl(page - 1) : null,
        results : selected.slice((page - 1) * nbResults, page * nbResults)
      }

    }

  }, {

    path : ":id",

    handler(request) {

      const searchedItem = list.find(item => item.id === request.params.id)

      if (!searchedItem) return makeResponse({ detail : "Not found." }, 404)

      return searchedItem
    }

  }, {

    path : ":id",

    method : "PUT",

    handler(request) {

      const searchedItem = list.find(item => item.id === request.params.id)

      if (!searchedItem) return makeResponse({ detail : "Not found." }, 404)

      let fields

      try {
        fields = JSON.parse(request.body)
      } catch (e) {
        return makeResponse({ detail : "Bad request" }, 400)
      }

      for (const n in fields) {
        if (searchedItem.hasOwnProperty(n)) {
          // return makeResponse({ name : ["This field is incorrect"] }, 400)
          searchedItem[n] = fields[n]
        }
      }

      return makeResponse(searchedItem)
    }

  }, {

    path : ":id",

    method : "PATCH",

    handler(request) {

      const searchedItem = list.find(item => item.id === request.params.id)

      if (!searchedItem) return makeResponse({ detail : "Not found." }, 404)

      let fields

      try {
        fields = JSON.parse(request.body)
      } catch (e) {
        return makeResponse({ detail : "Bad request" }, 400)
      }

      for (const n in fields) {
        if (searchedItem.hasOwnProperty(n)) searchedItem[n] = fields[n]
      }

      return makeResponse(searchedItem)

    }

  }, {

    path : "",

    method : "POST",

    handler(request) {

      let item

      try {
        item = JSON.parse(request.body)
      } catch (e) {
        return makeResponse({ detail : "Bad request" }, 400)
      }

      item.id = chance.guid()

      list.push(item)

      return makeResponse(item)

    }

  }, {

    path : ":id",

    method : "DELETE",

    handler(request) {

      const index = list.findIndex(item => item.id === request.params.id)

      if (index === -1) return makeResponse({ detail : "Not found." }, 404)

      list.splice(index, 1)

      return makeResponse(null, 204)

    }

  }]

}
