"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, BookmarkCheck, Eye, Star, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function EmployeeCard({ employee, isBookmarked, onView, onBookmark, onPromote }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative h-12 w-12">
            <Image
              src={employee.image || "/placeholder.svg"}
              alt={employee.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{employee.name}</h3>
            <p className="text-sm text-muted-foreground">{employee.email}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-sm">Department:</span>
            <Badge variant="outline">{employee.department}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Age:</span>
            <span className="text-sm">{employee.age}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Performance:</span>
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < employee.performanceRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onView} className="flex-1">
            <Eye className="mr-1 h-4 w-4" />
            View
          </Button>
          <Button variant="outline" size="sm" onClick={onBookmark} className="flex-1">
            {isBookmarked ? (
              <>
                <BookmarkCheck className="mr-1 h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="mr-1 h-4 w-4" />
                Save
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={onPromote} className="flex-1">
            <TrendingUp className="mr-1 h-4 w-4" />
            Promote
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
