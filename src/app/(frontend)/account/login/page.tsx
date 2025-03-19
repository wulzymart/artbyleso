import { LoginForm } from '@/components/account/login-form'
import { Logo } from '@/components/Logo/Logo'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="text-primary-foreground flex  items-center justify-center rounded-md">
            <Logo src="/logo-dark.png" height={40} />
          </div>
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
