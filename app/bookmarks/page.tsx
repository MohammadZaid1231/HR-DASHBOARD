"use client"
import { useRouter } from "next/navigation"
import { useBookmarks } from "@/hooks/use-bookmarks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, ChevronLeft, Eye, Star, TrendingUp, X } from "lucide-react"
import Image from "next/image"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks()
  const router = useRouter()

  const handleViewEmployee = (id) => {
    router.push(`/employee/${id}`)
  }

  const handleRemoveBookmark = (id) => {
    removeBookmark(id)
  }

  const handlePromote = (id, name) => {
    alert(`${name} has been promoted!`)
  }

  const handleAssignToProject = (id, name) => {
    alert(`${name} has been assigned to a new project!`)
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
          <p className="text-muted-foreground mt-1">Manage your bookmarked employees</p>
        </div>
      </div>

      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((employee) => (
            <Card key={employee.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="relative h-10 w-10">
                      <Image
                        src={employee.image || "/placeholder.svg"}
                        alt={employee.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{employee.name}</CardTitle>
                      <CardDescription>{employee.department}</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveBookmark(employee.id)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove bookmark</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < employee.performanceRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {employee.performanceRating === 5
                      ? "Outstanding"
                      : employee.performanceRating === 4
                        ? "Exceeds Expectations"
                        : employee.performanceRating === 3
                          ? "Meets Expectations"
                          : employee.performanceRating === 2
                            ? "Needs Improvement"
                            : "Unsatisfactory"}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewEmployee(employee.id)}
                    className="flex-1"
                  >
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePromote(employee.id, employee.name)}
                    className="flex-1"
                  >
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    Promote
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAssignToProject(employee.id, employee.name)}
                    className="w-full mt-2"
                  >
                    Assign to Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Alert>
          <Bookmark className="h-4 w-4" />
          <AlertTitle>No bookmarks yet</AlertTitle>
          <AlertDescription>
            You haven&apos;t bookmarked any employees yet. Go to the dashboard and bookmark employees to see them here.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
