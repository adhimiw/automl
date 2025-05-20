import Link from "next/link"
import { LucideBrain } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center gap-2 font-bold">
        <LucideBrain className="h-6 w-6" />
        <span>Data Automation Platform</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
          Dashboard
        </Link>
        <Link href="/dashboard/projects" className="text-sm font-medium transition-colors hover:text-primary">
          Projects
        </Link>
        <Link href="/dashboard/datasets" className="text-sm font-medium transition-colors hover:text-primary">
          Datasets
        </Link>
        <Link href="/learn" className="text-sm font-medium transition-colors hover:text-primary">
          Learn
        </Link>
      </nav>
    </div>
  )
}
