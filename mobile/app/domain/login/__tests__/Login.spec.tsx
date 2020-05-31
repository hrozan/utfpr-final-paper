import "react-native"
import React from "react"
import Login, { TOKEN_KEY } from "../Login"
import { render, fireEvent, wait } from "@testing-library/react-native"
import nock from "nock"
import { API_URL } from "../../../infra/config"
import { loginUrl } from "../service"
import AsyncStorage from "@react-native-community/async-storage"

describe("Login.Component", () => {
  it("should login correctly", async () => {
    const responseMock = { token: "test-token" }
    nock(API_URL)
      .post(loginUrl)
      .reply(200, responseMock)

    const { getByTestId } = render(<Login />)

    const emailInput = getByTestId("email-input")
    fireEvent.changeText(emailInput, "test@email.com")

    const passwordInput = getByTestId("password-input")
    fireEvent.changeText(passwordInput, "pass123")

    const loginButton = getByTestId("login-button")

    await fireEvent.press(loginButton)

    await wait()

    expect(AsyncStorage.setItem).toBeCalledWith(TOKEN_KEY, responseMock.token)
  })
})
