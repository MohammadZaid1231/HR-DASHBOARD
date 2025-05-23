"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bookmark, Home, LineChart, Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      name: "Bookmarks",
      path: "/bookmarks",
      icon: <Bookmark className="h-4 w-4 mr-2" />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <LineChart className="h-4 w-4 mr-2" />,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">HR Dashboard</span>
          </Link>
          <nav className="flex items-center space-x-2 text-sm font-medium">
            {routes.map((route) => (
              <Button key={route.path} variant={pathname === route.path ? "default" : "ghost"} size="sm" asChild>
                <Link href={route.path}>
                  {route.icon}
                  {route.name}
                </Link>
              </Button>
            ))}
          </nav>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <span className="font-bold">HR Dashboard</span>
            </Link>
            <nav className="flex flex-col space-y-2">
              {routes.map((route) => (
                <Button
                  key={route.path}
                  variant={pathname === route.path ? "default" : "ghost"}
                  size="sm"
                  asChild
                  onClick={() => setOpen(false)}
                >
                  <Link href={route.path}>
                    {route.icon}
                    {route.name}
                  </Link>
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
              <span className="font-bold">HR Dashboard</span>
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
