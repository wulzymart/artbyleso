'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { sendContactForm } from '@/app/actions/contact'

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
})

type ContactFormValues = z.infer<typeof formSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string | null;
  }>({
    type: null,
    message: null,
  })

  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  // Form submission handler
  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    setFormStatus({ type: null, message: null })
    
    try {
      await sendContactForm(data)
      setFormStatus({
        type: 'success',
        message: 'Thank you for your message! I will get back to you soon.',
      })
      form.reset()
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Failed to send your message. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      {...field} 
                      className="bg-black/20 border-amber-500/30 focus:border-amber-400 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your email address" 
                      type="email" 
                      {...field} 
                      className="bg-black/20 border-amber-500/30 focus:border-amber-400 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Subject</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Message subject" 
                    {...field} 
                    className="bg-black/20 border-amber-500/30 focus:border-amber-400 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Your message" 
                    {...field} 
                    rows={6}
                    className="bg-black/20 border-amber-500/30 focus:border-amber-400 text-white resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {formStatus.message && (
            <div className={`p-4 rounded-md ${
              formStatus.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
            }`}>
              {formStatus.message}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
