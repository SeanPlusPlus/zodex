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
    name: typeof entry.name === 'string' ? entry.name : errors.push('Invalid name'),
    age: typeof entry.age === 'number' && Number.isInteger(entry.age) && entry.age > 0 ? entry.age : errors.push('Invalid age'),
    email: typeof entry.email === 'string' && /^\S+@\S+\.\S+$/.test(entry.email) ? entry.email : errors.push('Invalid email'),
  }

  if (errors.length === 0) {
    console.log("Valid user:", parsedUser)
  } else {
    console.log("\nInvalid user:", JSON.stringify(errors, null, 2))
  }
})
