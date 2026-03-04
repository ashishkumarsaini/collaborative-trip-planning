import { LoginForm } from "@/components/form"

export default function LoginPage() {
  return (
    <div className="grid min-h-[90vh] lg:grid-cols-2">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <LoginForm />
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block bg-[url(https://images.unsplash.com/photo-1495785870240-c8456d5aeda2)] bg-cover bg-center">
      </div>
    </div>
  )
}
