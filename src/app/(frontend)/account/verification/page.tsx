export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ name: string; email: string }>
}) {
  const { name, email } = await searchParams

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Thanks for signing up! {name}</h1>
        <p className="text-gray-600">Please check your email at {email} to verify your account.</p>
      </div>
    </div>
  )
}
