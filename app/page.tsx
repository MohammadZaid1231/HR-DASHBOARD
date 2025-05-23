"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearch } from "@/hooks/use-search"
import { useBookmarks } from "@/hooks/use-bookmarks"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bookmark, TrendingUp } from "lucide-react"
import EmployeeCard from "@/components/employee-card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Dashboard() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [departments, setDepartments] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedRating, setSelectedRating] = useState("all")
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(employees, ["name", "email", "department"])
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarks()
  const router = useRouter()

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users?limit=20")
        const data = await response.json()

        // Transform the data and add department and performance rating
        const departmentOptions = ["Engineering", "Marketing", "HR", "Finance", "Product", "Sales"]
        const transformedEmployees = data.users.map((user) => {
          const department = departmentOptions[Math.floor(Math.random() * departmentOptions.length)]
          const performanceRating = Math.floor(Math.random() * 5) + 1

          return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            age: user.age,
            department,
            performanceRating,
            image: user.image,
            address: user.address,
            phone: user.phone,
          }
        })

        setEmployees(transformedEmployees)

        // Extract unique departments
        const uniqueDepartments = [...new Set(transformedEmployees.map((emp) => emp.department))]
        setDepartments(uniqueDepartments)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching employees:", error)
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  // Apply filters on top of search
  const filteredEmployees = filteredItems.filter((employee) => {
    const departmentMatch = selectedDepartment === "all" ? true : employee.department === selectedDepartment
    const ratingMatch = selectedRating === "all" ? true : employee.performanceRating === Number.parseInt(selectedRating)
    return departmentMatch && ratingMatch
  })

  const handleViewEmployee = (id) => {
    router.push(`/employee/${id}`)
  }

  const handleToggleBookmark = (employee) => {
    if (isBookmarked(employee.id)) {
      removeBookmark(employee.id)
    } else {
      addBookmark(employee)
    }
  }

  const handlePromote = (id) => {
    // In a real app, this would trigger an API call
    alert(`Employee ${id} has been promoted!`)
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HR Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage employee performance and bookmarks</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push("/bookmarks")}>
            <Bookmark className="mr-2 h-4 w-4" />
            Bookmarks
          </Button>
          <Button variant="outline" onClick={() => router.push("/analytics")}>
            <TrendingUp className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <ThemeToggle />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-6">
        <Input
          placeholder="Search by name, email or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <div className="flex gap-2">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger>
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              {[1, 2, 3, 4, 5].map((rating) => (
                <SelectItem key={rating} value={rating.toString()}>
                  {rating} Star{rating !== 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex justify-between mt-4">
                  <Skeleton className="h-10 w-[80px]" />
                  <Skeleton className="h-10 w-[80px]" />
                  <Skeleton className="h-10 w-[80px]" />
                </div>
              </Card>
            ))}
        </div>
      ) : filteredEmployees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              isBookmarked={isBookmarked(employee.id)}
              onView={() => handleViewEmployee(employee.id)}
              onBookmark={() => handleToggleBookmark(employee)}
              onPromote={() => handlePromote(employee.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No employees found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
