/* eslint no-unused-expressions:0, max-nested-callbacks:0 */
import * as rules from "./rules"

const { minLength, maxLength, email, required, slug } = rules

describe("fields validation rules", () => {

  it("should validate emails", () => {

    expect(email("yannick.bochatay@meteo.fr")).to.be.true
    expect(email("yannick.bochatay")).to.be.false
    expect(email("yannick.bochàtay!@meteo")).to.be.false
    expect(email("yannick_%bochatay21@meteo")).to.be.true

  })

  it("should validate min length", () => {

    const minLength3 = minLength(3)

    expect(minLength3("yannick")).to.be.true
    expect(minLength3("yan")).to.be.true
    expect(minLength3("ya")).to.be.false
    expect(minLength3("")).to.be.false

  })

  it("should validate max length", () => {

    const maxLength3 = maxLength(3)

    expect(maxLength3("yannick")).to.be.false
    expect(maxLength3("yan")).to.be.true
    expect(maxLength3("ya")).to.be.true
    expect(maxLength3("")).to.be.true

  })

  it("should validate required fields", () => {

    expect(required("yannick")).to.be.true
    expect(required("")).to.be.false

  })

  it("should validate slug fields", () => {

    expect(slug("yannick")).to.be.true
    expect(slug("dzahui%")).to.be.false

  })

})
