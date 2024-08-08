// Validation Functions
const isString = (value) => typeof value === 'string'

const isPositiveInteger = (value) => typeof value === 'number' && 
  Number.isInteger(value) && value > 0

const isEmail = (value) => typeof value === 'string' && 
  /^\S+@\S+\.\S+$/.test(value)

const isValidHobbies = (hobbies) => Array.isArray(hobbies) && hobbies.every(hobby => 
  typeof hobby === 'object' && hobby !== null && isString(hobby.name),
)

// Example entries
const entries = [
  // Valid data
  {
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
    hobbies: [
      { name: "Running" },
      { name: "Reading" },
    ],
  },

  // Bad Data
  {
    name: "John Doe 2",
    age: -5,
    email: "not-an-email",
    hobbies: [
      { name: "Cooking" },
      { foo: "bar" },  // Invalid hobby
    ],
  },
]

entries.forEach((entry) => {
  const errors = []

  // Validation
  if (!isString(entry.name)) {
    errors.push('Invalid name')
  }
  if (!isPositiveInteger(entry.age)) {
    errors.push('Invalid age')
  }
  if (!isEmail(entry.email)) {
    errors.push('Invalid email')
  }
  if (!isValidHobbies(entry.hobbies)) {
    errors.push('Invalid hobbies')
  }

  if (errors.length === 0) {
    // If no errors, create the parsedUser object
    const parsedUser = {
      name: entry.name,
      age: entry.age,
      email: entry.email,
    }
    console.log("Valid user:", parsedUser)
  } else {
    console.log("\nInvalid user:", JSON.stringify(errors, null, 2))
  }
})