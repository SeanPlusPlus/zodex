import { z } from "zod"

// Zod Schema Definition for a Valid User
const userSchema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
  email: z.string().email(),
})

// TypeScript type inferred from Zod schema
type User = z.infer<typeof userSchema>

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

// *** Output ***
//
// Valid user: { name: 'John Doe', age: 30, email: 'john.doe@example.com' }

// Invalid user: {
//   "issues": [
//     {
//       "code": "too_small",
//       "minimum": 0,
//       "type": "number",
//       "inclusive": false,
//       "exact": false,
//       "message": "Number must be greater than 0",
//       "path": [
//         "age"
//       ]
//     },
//     {
//       "validation": "email",
//       "code": "invalid_string",
//       "message": "Invalid email",
//       "path": [
//         "email"
//       ]
//     }
//   ],
//   "name": "ZodError"
// }
