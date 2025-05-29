import { z } from "zod"
 
const userSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  email: z.string().email({message: 'invalid email format'}),
})


export default userSchema;
