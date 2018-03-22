import createMock from "../createMock"
import Chance from "chance"

const chance = new Chance()

const list = []

for (let i = 0; i < 100; i++) {
  list.push({
    id : chance.guid(),
    name : chance.first()
  })
}

export default createMock(list)
