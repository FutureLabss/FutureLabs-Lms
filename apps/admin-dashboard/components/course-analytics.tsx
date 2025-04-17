"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCourses } from "./course-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CourseAnalyticsSkeleton } from "./course-analytics-skeleton"

// Generate random data for analytics
const generateAnalyticsData = (days: number) => {
  const data = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      views: Math.floor(Math.random() * 50) + 10,
      completions: Math.floor(Math.random() * 30) + 5,
      enrollments: Math.floor(Math.random() * 10) + 1,
    })
  }

  return data
}

export function CourseAnalytics() {
  const { selectedCourse, analyticsFilter, setAnalyticsFilter, isLoadingAnalytics } = useCourses()
  const [data, setData] = useState(() => generateAnalyticsData(analyticsFilter))

  useEffect(() => {
    setData(generateAnalyticsData(analyticsFilter))
  }, [analyticsFilter])

  if (isLoadingAnalytics || !selectedCourse) {
    return <CourseAnalyticsSkeleton />
  }

  const handleFilterChange = (value: string) => {
    const days = Number.parseInt(value)
    setAnalyticsFilter(days)
  }

  // Calculate totals
  const totalViews = data.reduce((sum, item) => sum + item.views, 0)
  const totalCompletions = data.reduce((sum, item) => sum + item.completions, 0)
  const totalEnrollments = data.reduce((sum, item) => sum + item.enrollments, 0)

  // Calculate averages
  const avgViews = Math.round(totalViews / data.length)
  const avgCompletions = Math.round(totalCompletions / data.length)
  const avgEnrollments = Math.round(totalEnrollments / data.length)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{selectedCourse.title} Analytics</h2>
          <p className="text-sm text-muted-foreground">View performance metrics for this course</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filter by:</span>
          <Select value={analyticsFilter.toString()} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="14">Last 14 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <CardDescription>Last {analyticsFilter} days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
            <p className="text-xs text-muted-foreground">Avg: {avgViews} per day</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Completions</CardTitle>
            <CardDescription>Last {analyticsFilter} days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompletions}</div>
            <p className="text-xs text-muted-foreground">Avg: {avgCompletions} per day</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Enrollments</CardTitle>
            <CardDescription>Last {analyticsFilter} days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEnrollments}</div>
            <p className="text-xs text-muted-foreground">Avg: {avgEnrollments} per day</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Activity</CardTitle>
          <CardDescription>Views, completions, and enrollments over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#8884d8" name="Views" />
                <Bar dataKey="completions" fill="#82ca9d" name="Completions" />
                <Bar dataKey="enrollments" fill="#ffc658" name="Enrollments" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Module Performance</CardTitle>
          <CardDescription>Completion rates by module</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedCourse.modules.map((module) => {
              const totalVideoViews = module.videos.reduce((sum, video) => sum + video.views, 0)
              const totalVideoCompletions = module.videos.reduce((sum, video) => sum + video.completions, 0)
              const completionRate =
                module.videos.length > 0 ? Math.round((totalVideoCompletions / totalVideoViews) * 100) : 0

              return (
                <div key={module.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{module.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {module.videos.length} videos · {totalVideoViews} views
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">{completionRate}%</div>
                      <p className="text-xs text-muted-foreground">Completion rate</p>
                    </div>
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-primary" style={{ width: `${completionRate}%` }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
