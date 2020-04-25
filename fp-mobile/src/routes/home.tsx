import React from "react"
import {Button, Form, Input, Item, Label, Text} from "native-base"

export default () => {
  return (
    <Form>
      <Item floatingLabel>
        <Label>Username</Label>
        <Input />
      </Item>
      <Item floatingLabel last>
        <Label>Password</Label>
        <Input />
      </Item>
      <Button full onPress={() => console.log("SD")}>
        <Text>Login</Text>
      </Button>
    </Form>
  )
}
