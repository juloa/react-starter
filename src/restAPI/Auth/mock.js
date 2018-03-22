import Chance from "chance"

const chance = new Chance()

export default {
  path : "",
  handler : () => ({
    token : chance.guid()
  })
}
