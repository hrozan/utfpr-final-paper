import React from "react"
import { shallow } from "enzyme"
import Button from "./index"

it("should render a button tag", async () => {
  const wrapper = shallow(<Button />)
  expect(wrapper.find("button")).toBeTruthy()
})
