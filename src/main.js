// Validation Functions
const isString = (value) => typeof value === 'string'

const isPositiveInteger = (value) => typeof value === 'number' && Number.isInteger(value) && value > 0

const isEmail = (value) => typeof value === 'string' && /^\S+@\S+\.\S+$/.test(value)

const entries = [
  // Valid data
  {
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
  },

  // Bad Data
  {
    name: "John Doe 2",
    age: -5,
    email: "not-an-email",
  },
]

entries.forEach((entry) => {
  const errors = []

  // Parsing and validation
  const parsedUser = {
    name: isString(entry.name) ? entry.name : errors.push('Invalid name'),
    age: isPositiveInteger(entry.age) ? entry.age : errors.push('Invalid age'),
    email: isEmail(entry.email) ? entry.email : errors.push('Invalid email'),
  }

  if (errors.length === 0) {
    console.log("Valid user:", parsedUser)
  } else {
    console.log("\nInvalid user:", JSON.stringify(errors, null, 2))
  }
})
