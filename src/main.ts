import { z } from "zod"

// Zod Schema Definition for a Valid User
const userSchema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
  email: z.string().email(),
})

// TypeScript type explicitly defined to match Zod schema
type User = {
  name: string;
  age: number;
  email: string;
}

const entries: User[] = [
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
  const userResult = userSchema.safeParse(entry)

  if (userResult.success) {
    console.log("Valid user:", userResult.data)
  } else {
    // Improved error logging
    console.log("\nInvalid user:", JSON.stringify(userResult.error, null, 2))
  }
})
