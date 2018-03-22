import RestClient from "restAPI/RestClient"

export default class PermissionClient extends RestClient {

  constructor() {

    super("/public/api/metro/user/accounts/user")

  }

}
