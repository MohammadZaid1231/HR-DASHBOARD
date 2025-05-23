"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useBookmarks } from "@/hooks/use-bookmarks"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Bookmark, BookmarkCheck, ChevronLeft, Mail, MapPin, Phone, Star, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function EmployeeDetails() {
  const { id } = useParams()
  const router = useRouter()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()
  const [projects, setProjects] = useState([])
  const [feedback, setFeedback] = useState([])

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`)
        const data = await response.json()

        // Transform the data
        const departmentOptions = ["Engineering", "Marketing", "HR", "Finance", "Product", "Sales"]
        const department = departmentOptions[Math.floor(Math.random() * departmentOptions.length)]
        const performanceRating = Math.floor(Math.random() * 5) + 1

        const transformedEmployee = {
          id: data.id,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          age: data.age,
          department,
          performanceRating,
          image: data.image,
          address: data.address,
          phone: data.phone,
          bio: `${data.firstName} ${data.lastName} is a dedicated professional with ${Math.floor(Math.random() * 10) + 1} years of experience in the ${department} department. Known for ${Math.random() > 0.5 ? "innovative thinking" : "attention to detail"} and excellent communication skills.`,
          performanceHistory: generatePerformanceHistory(),
        }

        setEmployee(transformedEmployee)
        setProjects(generateProjects(department))
        setFeedback(generateFeedback())
        setLoading(false)
      } catch (error) {
        console.error("Error fetching employee:", error)
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [id])

  const generatePerformanceHistory = () => {
    const history = []
    const currentYear = new Date().getFullYear()

    for (let i = 0; i < 4; i++) {
      history.push({
        year: currentYear - i,
        quarter: 4 - (i % 4),
        rating: Math.floor(Math.random() * 5) + 1,
        notes: `${Math.random() > 0.5 ? "Exceeded" : "Met"} expectations for the quarter. ${Math.random() > 0.7 ? "Received recognition for outstanding project work." : ""}`,
      })
    }

    return history
  }

  const generateProjects = (department) => {
    const projectTypes = {
      Engineering: ["API Integration", "Frontend Redesign", "Database Migration", "Mobile App Development"],
      Marketing: ["Brand Campaign", "Social Media Strategy", "Market Research", "Product Launch"],
      HR: ["Recruitment Drive", "Employee Engagement", "Training Program", "Policy Update"],
      Finance: ["Budget Analysis", "Financial Reporting", "Audit Preparation", "Cost Reduction"],
      Product: ["Feature Development", "User Testing", "Product Roadmap", "Competitor Analysis"],
      Sales: ["Lead Generation", "Client Acquisition", "Sales Training", "Territory Expansion"],
    }

    const projects = []
    const departmentProjects = projectTypes[department] || projectTypes.HR

    for (let i = 0; i < 4; i++) {
      const projectName = departmentProjects[i % departmentProjects.length]
      projects.push({
        id: i + 1,
        name: `${projectName} ${Math.floor(Math.random() * 100) + 1}`,
        status: ["In Progress", "Completed", "Planning", "On Hold"][Math.floor(Math.random() * 4)],
        completion: Math.floor(Math.random() * 100),
        role: ["Lead", "Contributor", "Reviewer", "Manager"][Math.floor(Math.random() * 4)],
      })
    }

    return projects
  }

  const generateFeedback = () => {
    const feedbackTemplates = [
      "Demonstrates excellent problem-solving skills and attention to detail.",
      "Consistently delivers high-quality work ahead of deadlines.",
      "Great team player who effectively collaborates with cross-functional teams.",
      "Shows initiative and proactively identifies opportunities for improvement.",
      "Excellent communication skills, both written and verbal.",
      "Needs improvement in time management and prioritization.",
      "Could benefit from developing deeper technical expertise.",
      "Demonstrates strong leadership potential.",
    ]

    const feedback = []

    for (let i = 0; i < 5; i++) {
      feedback.push({
        id: i + 1,
        from: ["Manager", "Peer", "Client", "Self", "HR"][Math.floor(Math.random() * 5)],
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
        content: feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)],
        rating: Math.floor(Math.random() * 5) + 1,
      })
    }

    return feedback
  }

  const handleToggleBookmark = () => {
    if (isBookmarked(employee.id)) {
      removeBookmark(employee.id)
    } else {
      addBookmark(employee)
    }
  }

  const handlePromote = () => {
    alert(`${employee.name} has been promoted!`)
  }

  const getRatingColor = (rating) => {
    switch (rating) {
      case 1:
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case 2:
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      case 3:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case 4:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case 5:
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Skeleton className="h-8 w-[200px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Skeleton className="h-32 w-32 rounded-full" />
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
                <div className="flex space-x-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-5 w-5" />
                    ))}
                </div>
                <div className="w-full space-y-2 mt-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[100px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Employee Not Found</h1>
        </div>
        <p>The employee you are looking for does not exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{employee.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative h-32 w-32 mb-4">
                <Image
                  src={employee.image || "/placeholder.svg"}
                  alt={employee.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">{employee.name}</h2>
              <p className="text-muted-foreground mb-2">{employee.department}</p>

              <div className="flex items-center mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < employee.performanceRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
              </div>

              <Badge className={`mb-4 ${getRatingColor(employee.performanceRating)}`}>
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

              <div className="w-full space-y-2 mb-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{employee.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{employee.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{`${employee.address.address}, ${employee.address.city}`}</span>
                </div>
              </div>

              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1" onClick={handleToggleBookmark}>
                  {isBookmarked(employee.id) ? (
                    <>
                      <BookmarkCheck className="mr-2 h-4 w-4" />
                      Bookmarked
                    </>
                  ) : (
                    <>
                      <Bookmark className="mr-2 h-4 w-4" />
                      Bookmark
                    </>
                  )}
                </Button>
                <Button className="flex-1" onClick={handlePromote}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Promote
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Employee Bio</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{employee.bio}</p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Performance History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employee.performanceHistory.map((record, index) => (
                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{`Q${record.quarter} ${record.year}`}</h4>
                        <div className="flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < record.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                              />
                            ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{record.notes}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Current Projects</CardTitle>
                <CardDescription>Projects the employee is currently working on</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {projects.map((project) => (
                    <div key={project.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="text-sm text-muted-foreground">Role: {project.role}</p>
                        </div>
                        <Badge
                          variant={
                            project.status === "Completed"
                              ? "default"
                              : project.status === "In Progress"
                                ? "secondary"
                                : project.status === "Planning"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>

                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Completion</span>
                          <span>{project.completion}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full"
                            style={{ width: `${project.completion}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Performance Feedback</CardTitle>
                <CardDescription>Feedback received from various sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {feedback.map((item) => (
                    <div key={item.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Feedback from {item.from}</h4>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                        <div className="flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                              />
                            ))}
                        </div>
                      </div>
                      <p className="text-sm">{item.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
