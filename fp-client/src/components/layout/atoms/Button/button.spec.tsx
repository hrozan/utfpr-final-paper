import React from "react"
import { shallow, ShallowWrapper } from "enzyme"
import Button from "./index"

describe("Button", () => {
  it("should render a button tag", async () => {
    const wrapper: ShallowWrapper = shallow(<Button>Click me</Button>)
    expect(wrapper.find("button")).toBeTruthy()
  })

  it("should render a text in button", async () => {
    const buttonText = "Click Me"
    const wrapper: ShallowWrapper = shallow(<Button>{buttonText}</Button>)
    expect(wrapper.children().text()).toBe(buttonText)
  })
})
