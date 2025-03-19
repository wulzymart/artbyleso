'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { LoginForm } from './login-form'
import { SignUpForm } from './sign-up'

const AccountAccess = () => {
  return (
    <div className="flex flex-col w-sm h-full gap-6 items-center justify-center">
      <div className="w-[90%] mx-auto">
        <Tabs>
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AccountAccess
