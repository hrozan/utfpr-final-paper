import validate from "validate.js"

export interface User {
  _id?: string
  userName: string
  email: string
  password: string
}

const baseConstraints = {
  type: "string",
  presence: {
    allowEmpty: false
  }
}

const constraints = {
  userName: {
    ...baseConstraints
  },
  email: {
    ...baseConstraints,
    email: true
  },
  password: {
    ...baseConstraints
  }
}

export const validateUser = (user: User) => validate(user, constraints)
