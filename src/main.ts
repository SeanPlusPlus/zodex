import { z } from "zod"

// Define the schema for hobbies
const hobbySchema = z.object({
  name: z.string(),
})

// Zod Schema Definition for a Valid User
const userSchema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
  email: z.string().email(),
  hobbies: z.array(hobbySchema),
})

// TypeScript type inferred from Zod schema
// type User = z.infer<typeof userSchema>

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
  const userResult = userSchema.safeParse(entry)

  if (userResult.success) {
    console.log("Valid user:", userResult.data)
  } else {
    // Improved error logging
    console.log("\nInvalid user:", JSON.stringify(userResult.error, null, 2))
  }
})
