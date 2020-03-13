import React from "react"
import { shallow, ShallowWrapper } from "enzyme"
import Link from "./index"

describe("Link", () => {
  it("should render successfully", async () => {
    const path = "/test"

    const wrapper: ShallowWrapper = shallow(<Link to={path} />)

    expect(wrapper.prop("to")).toBe(path)
  })
})
