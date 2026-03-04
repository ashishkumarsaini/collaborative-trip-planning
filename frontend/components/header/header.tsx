import { Mountain, UserCircle } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

export const Header = () => {
  return (
    <header>
      <div className="fixed top-0 right-0 left-0 w-full backdrop-blur-2xl border-b border-dashed z-50">
        <div className="h-mobile-header md:h-desktop-header flex items-center justify-between max-w-[1250px] border-r border-l m-auto px-5">
          <div className="flex flex-col">
            <Link href="/" title="DesiBees">
              <div className="flex gap-1">
                <Mountain className="fill-primary" />
                <p className="font-bold">DesiBees</p>
              </div>
            </Link>
          </div>
          <div>
            <div className="flex">
              <Button size="lg" variant="ghost">
                <UserCircle className="fill-primary" />
                <p>Login</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}