import React from "react"
import { shallow, ShallowWrapper } from "enzyme"
import Card from "./index"

describe("Card", () => {
  it("should render with title", async () => {
    const cardTitle = "Test Title"
    const cardContent = "Content"

    const wrapper: ShallowWrapper = shallow(<Card title={cardTitle}>{cardContent}</Card>)

    expect(wrapper.find("p").text()).toBe(cardTitle)
    expect(wrapper.childAt(1).text()).toBe(cardContent)
  })
})
