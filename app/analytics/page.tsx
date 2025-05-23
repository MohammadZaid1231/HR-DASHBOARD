"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useBookmarks } from "@/hooks/use-bookmarks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AnalyticsPage() {
  const router = useRouter()
  const { bookmarks } = useBookmarks()
  const [departmentData, setDepartmentData] = useState([])
  const [bookmarkTrends, setBookmarkTrends] = useState([])
  const [performanceData, setPerformanceData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching analytics data
    const fetchAnalyticsData = async () => {
      try {
        // In a real app, this would be an API call
        const response = await fetch("https://dummyjson.com/users?limit=100")
        const data = await response.json()

        // Transform the data for department analytics
        const departmentOptions = ["Engineering", "Marketing", "HR", "Finance", "Product", "Sales"]
        const departmentStats = departmentOptions.map((dept) => {
          return {
            name: dept,
            avgRating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
            employeeCount: Math.floor(Math.random() * 50) + 10, // Random count between 10 and 60
          }
        })

        setDepartmentData(departmentStats)

        // Generate mock bookmark trends data (last 6 months)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const currentMonth = new Date().getMonth()
        const trendData = []

        for (let i = 5; i >= 0; i--) {
          const monthIndex = (currentMonth - i + 12) % 12
          trendData.push({
            name: months[monthIndex],
            bookmarks: Math.floor(Math.random() * 15) + 5, // Random between 5 and 20
            promotions: Math.floor(Math.random() * 8) + 1, // Random between 1 and 9
          })
        }

        setBookmarkTrends(trendData)

        // Generate performance distribution data
        const performanceDistribution = [
          { name: "Outstanding (5)", value: Math.floor(Math.random() * 30) + 10 },
          { name: "Exceeds Expectations (4)", value: Math.floor(Math.random() * 40) + 20 },
          { name: "Meets Expectations (3)", value: Math.floor(Math.random() * 30) + 30 },
          { name: "Needs Improvement (2)", value: Math.floor(Math.random() * 20) + 5 },
          { name: "Unsatisfactory (1)", value: Math.floor(Math.random() * 10) + 1 },
        ]

        setPerformanceData(performanceDistribution)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching analytics data:", error)
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const renderActiveShape = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
    const RADIAN = Math.PI / 180
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? "start" : "end"

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs">
          {`${payload.name}`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" className="text-xs">
          {`${value} employees (${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  }

  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">Performance metrics and insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Employees</CardTitle>
            <CardDescription>Active employees in system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {loading ? "..." : departmentData.reduce((acc, dept) => acc + dept.employeeCount, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Bookmarked Employees</CardTitle>
            <CardDescription>Your saved employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{bookmarks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Rating</CardTitle>
            <CardDescription>Overall performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {loading
                ? "..."
                : (
                    departmentData.reduce((acc, dept) => acc + Number.parseFloat(dept.avgRating), 0) /
                    departmentData.length
                  ).toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="departments">
        <TabsList className="mb-4">
          <TabsTrigger value="departments">Department Performance</TabsTrigger>
          <TabsTrigger value="trends">Bookmark Trends</TabsTrigger>
          <TabsTrigger value="distribution">Performance Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance Metrics</CardTitle>
              <CardDescription>Average ratings and employee count by department</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-[400px] flex items-center justify-center">
                  <p>Loading chart data...</p>
                </div>
              ) : (
                <div className="h-[400px]">
                  <ChartContainer
                    config={{
                      avgRating: {
                        label: "Avg Rating",
                        color: "hsl(var(--chart-1))",
                      },
                      employeeCount: {
                        label: "Employee Count",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="var(--color-avgRating)" />
                      <YAxis yAxisId="right" orientation="right" stroke="var(--color-employeeCount)" />
                      <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="avgRating" fill="var(--color-avgRating)" radius={4} />
                      <Bar yAxisId="right" dataKey="employeeCount" fill="var(--color-employeeCount)" radius={4} />
                    </BarChart>
                  </ChartContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Bookmark and Promotion Trends</CardTitle>
              <CardDescription>6-month history of bookmarks and promotions</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-[400px] flex items-center justify-center">
                  <p>Loading chart data...</p>
                </div>
              ) : (
                <div className="h-[400px]">
                  <ChartContainer
                    config={{
                      bookmarks: {
                        label: "Bookmarks",
                        color: "hsl(var(--chart-1))",
                      },
                      promotions: {
                        label: "Promotions",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <LineChart data={bookmarkTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="bookmarks"
                        stroke="var(--color-bookmarks)"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line type="monotone" dataKey="promotions" stroke="var(--color-promotions)" strokeWidth={2} />
                    </LineChart>
                  </ChartContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Performance Rating Distribution</CardTitle>
              <CardDescription>Distribution of employees across performance ratings</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-[400px] flex items-center justify-center">
                  <p>Loading chart data...</p>
                </div>
              ) : (
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
