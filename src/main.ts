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
type User = z.infer<typeof userSchema>

// Function to fetch entries from the API
async function fetchEntries() {
  try {
    const response = await fetch('https://simplejson.vercel.app/api/QQtkYrO9') 
    
    const data: User[] = await response.json()

    data.forEach((entry) => {
      const userResult = userSchema.safeParse(entry)
    
      if (userResult.success) {
        console.log("Valid user:", userResult.data)
      } else {
        // Improved error logging
        console.log("\nInvalid user:", JSON.stringify(userResult.error, null, 2))
      }
    })
  } catch (error) {
    console.error('Fetching data failed:', error)
  }
}

// Call the function to fetch and validate entries
fetchEntries()
