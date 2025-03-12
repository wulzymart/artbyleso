'use server'

import { z } from 'zod'

// Define the contact form schema for validation
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

type ContactFormData = z.infer<typeof contactFormSchema>

/**
 * Server action to handle contact form submission
 * In a real application, this would send an email or store the message in a database
 */
export async function sendContactForm(formData: ContactFormData) {
  // Validate the form data
  const validatedFields = contactFormSchema.safeParse(formData)
  
  if (!validatedFields.success) {
    throw new Error('Invalid form data')
  }

  // Simulate a delay to mimic sending an email or storing in a database
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // In a real application, you would:
  // 1. Send an email using a service like SendGrid, Mailgun, etc.
  // 2. Store the message in a database
  // 3. Notify the admin via email or other means
  
  console.log('Contact form submission:', validatedFields.data)
  
  // Return success
  return { success: true }
}
