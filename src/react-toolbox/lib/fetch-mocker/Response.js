export default class Res {

  constructor() {

    this._status = 200

  }

  status(num) {

    this._status = num

    return this

  }

  send(content) {

    return new Response(content, { status : this._status })

  }

  sendJSON(content) {

    return this.send(JSON.stringify(content, null, 2))

  }
}
