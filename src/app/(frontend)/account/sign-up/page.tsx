import { SignUpForm } from '@/components/account/sign-up'
import { Logo } from '@/components/Logo/Logo'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="text-primary-foreground flex  items-center justify-center rounded-md">
            <Logo src="/logo-dark.png" height={40} />
          </div>
        </Link>
        <SignUpForm inPage={true} />
      </div>
      <p className="text-sm text-muted-foreground">
        Have an account?{' '}
        <Link href="/account/login" className="text-primary">
          Login in here
        </Link>
      </p>
    </div>
  )
}
