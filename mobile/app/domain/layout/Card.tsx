import React from "react"
import { Card as NativeCard, CardItem, Body } from "native-base"

const Card: React.FC = (props) => (
  <NativeCard transparent>
    <CardItem>
      <Body>{props.children}</Body>
    </CardItem>
  </NativeCard>
)

export default Card
