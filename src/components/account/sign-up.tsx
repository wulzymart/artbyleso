'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/utilities/ui'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { set, useForm } from 'react-hook-form'
import signupCustomer from '../../context/helper/actions/signup'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Country, State, City } from 'country-state-city'
import { ICountry, IState, ICity } from 'country-state-city'
import { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { PhoneInput } from '@/components/ui/phone-input'
import { SheetClose } from '../ui/sheet'
export function SignUpForm({
  className,
  inPage,
  ...props
}: React.ComponentProps<'div'> & { inPage?: boolean }) {
  const zodSchema = z
    .object({
      firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
      lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
      email: z.string().email({ message: 'Please enter a valid email address' }),
      password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
      confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
      phoneNumber: z.string().refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
      address: z.object({
        address: z.string().min(10, { message: 'Provide a valid address' }),
        city: z.string().min(2, { message: 'Provide a valid city' }),
        state: z.string().min(2, { message: 'Provide a valid state' }),
        country: z.string().min(2, { message: 'Provide a valid country' }),
        postalCode: z.string().min(5, { message: 'Provide a valid postal code' }),
      }),
    })
    .refine(
      (data) => {
        return data.confirmPassword === data.password
      },
      {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      },
    )
  const router = useRouter()
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      address: {
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
      },
    },
  })

  const country = form.watch('address.country')
  const state = form.watch('address.state')

  const [countries, setCountries] = useState<(ICountry & { id: number })[]>([])
  const [states, setStates] = useState<(IState & { id: number })[]>([])
  const [cities, setCities] = useState<(ICity & { id: number })[]>([])
  const localeApi = process.env.NEXT_PUBLIC_LOCALE_API
  useEffect(() => {
    fetch(`${localeApi}/countries`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data)
      })
  }, [])
  useEffect(() => {
    const selectedCountry = countries.find((c) => c.name === country)
    if (selectedCountry) {
      fetch(`${localeApi}/countries/${selectedCountry.id}/states`)
        .then((res) => res.json())
        .then((data) => setStates(data))
    }
  }, [country])
  useEffect(() => {
    const selectedState = states.find((s) => s.name === state)
    if (selectedState) {
      fetch(`${localeApi}/states/${selectedState.id}/cities`)
        .then((res) => res.json())
        .then((data) => setCities(data))
    }
  }, [state])
  const onSubmit = async (values: z.infer<typeof zodSchema>) => {
    const { confirmPassword, ...rest } = values
    try {
      const user = await signupCustomer(rest)
      toast.success(`Thanks for signing up ${user.firstName}`)
      router.push(`/account/verification?name=${user.firstName}&email=${user.email}`)
    } catch (error) {
      toast.error('Failed to sign up')
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Sign up with your email & password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid  grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <PhoneInput placeholder="Enter a phone number" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="address.address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="address.postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.country"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Country</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    'w-full justify-between',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  {field.value
                                    ? countries.find((country) => country.name === field.value)
                                        ?.name
                                    : 'Select Country'}
                                  <ChevronsUpDown className="opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Search countries..." className="h-9" />
                                <CommandList>
                                  <CommandEmpty>No country found.</CommandEmpty>
                                  <CommandGroup>
                                    {countries.map((country) => (
                                      <CommandItem
                                        value={country.name}
                                        key={country.isoCode}
                                        onSelect={() => {
                                          form.setValue('address.country', country.name)
                                        }}
                                      >
                                        {country.name}
                                        <Check
                                          className={cn(
                                            'ml-auto',
                                            country.name === field.value
                                              ? 'opacity-100'
                                              : 'opacity-0',
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {country && states.length > 0 ? (
                      <FormField
                        control={form.control}
                        name="address.state"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>State</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      'w-full justify-between',
                                      !field.value && 'text-muted-foreground',
                                    )}
                                  >
                                    {field.value
                                      ? states.find((state) => state.name === field.value)?.name
                                      : 'Select State'}
                                    <ChevronsUpDown className="opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Search states..." className="h-9" />
                                  <CommandList>
                                    <CommandEmpty>No state found.</CommandEmpty>
                                    <CommandGroup>
                                      {states.map((state) => (
                                        <CommandItem
                                          value={state.name}
                                          key={state.isoCode}
                                          onSelect={() => {
                                            form.setValue('address.state', state.name)
                                          }}
                                        >
                                          {state.name}
                                          <Check
                                            className={cn(
                                              'ml-auto',
                                              state.name === field.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    ) : (
                      ''
                    )}

                    {state && cities.length > 0 ? (
                      <FormField
                        control={form.control}
                        name="address.city"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>City</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      'w-full justify-between',
                                      !field.value && 'text-muted-foreground',
                                    )}
                                  >
                                    {field.value
                                      ? cities.find((city) => city.name === field.value)?.name
                                      : 'Select City'}
                                    <ChevronsUpDown className="opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search cities..." className="h-9" />
                                  <CommandList>
                                    <CommandEmpty>No city found.</CommandEmpty>
                                    <CommandGroup>
                                      {cities.map((city) => (
                                        <CommandItem
                                          value={city.name}
                                          key={city.name}
                                          onSelect={() => {
                                            form.setValue('address.city', city.name)
                                          }}
                                        >
                                          {city.name}
                                          <Check
                                            className={cn(
                                              'ml-auto',
                                              city.name === field.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                  {/* <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div> */}

                  {!inPage ? (
                    <SheetClose asChild>
                      <Button type="submit" className="w-full">
                        Sign Up
                      </Button>
                    </SheetClose>
                  ) : (
                    <Button type="submit" className="w-full">
                      Sign Up
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
