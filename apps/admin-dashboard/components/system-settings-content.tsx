"use client"

import { useState } from "react"
import { Bell, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SystemSettingsContent() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full bg-muted pl-8 md:w-[240px] lg:w-[320px]" />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm font-medium md:inline-block">Admin</span>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin User" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
              <p className="text-muted-foreground">Configure platform settings and preferences</p>
            </div>
          </div>

          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Configure basic platform settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Platform Name</label>
                        <Input
                          defaultValue="EduLearn Admin Dashboard"
                          onChange={(e) => console.log("Platform name changed:", e.target.value)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Contact Email</label>
                        <Input
                          type="email"
                          defaultValue="admin@edulearn.com"
                          onChange={(e) => console.log("Email changed:", e.target.value)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Support Phone</label>
                        <Input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          onChange={(e) => console.log("Phone changed:", e.target.value)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Time Zone</label>
                        <Select defaultValue="utc-8">
                          <SelectTrigger>
                            <SelectValue placeholder="Select time zone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc-12">UTC-12:00</SelectItem>
                            <SelectItem value="utc-11">UTC-11:00</SelectItem>
                            <SelectItem value="utc-10">UTC-10:00</SelectItem>
                            <SelectItem value="utc-9">UTC-09:00</SelectItem>
                            <SelectItem value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                            <SelectItem value="utc-7">UTC-07:00 (Mountain Time)</SelectItem>
                            <SelectItem value="utc-6">UTC-06:00 (Central Time)</SelectItem>
                            <SelectItem value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                            <SelectItem value="utc-4">UTC-04:00</SelectItem>
                            <SelectItem value="utc-3">UTC-03:00</SelectItem>
                            <SelectItem value="utc-2">UTC-02:00</SelectItem>
                            <SelectItem value="utc-1">UTC-01:00</SelectItem>
                            <SelectItem value="utc">UTC+00:00</SelectItem>
                            <SelectItem value="utc+1">UTC+01:00</SelectItem>
                            <SelectItem value="utc+2">UTC+02:00</SelectItem>
                            <SelectItem value="utc+3">UTC+03:00</SelectItem>
                            <SelectItem value="utc+4">UTC+04:00</SelectItem>
                            <SelectItem value="utc+5">UTC+05:00</SelectItem>
                            <SelectItem value="utc+5:30">UTC+05:30 (India)</SelectItem>
                            <SelectItem value="utc+6">UTC+06:00</SelectItem>
                            <SelectItem value="utc+7">UTC+07:00</SelectItem>
                            <SelectItem value="utc+8">UTC+08:00</SelectItem>
                            <SelectItem value="utc+9">UTC+09:00</SelectItem>
                            <SelectItem value="utc+10">UTC+10:00</SelectItem>
                            <SelectItem value="utc+11">UTC+11:00</SelectItem>
                            <SelectItem value="utc+12">UTC+12:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Date Format</label>
                        <Select defaultValue="mm-dd-yyyy">
                          <SelectTrigger>
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                            <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">Maintenance Mode</h3>
                          <p className="text-sm text-muted-foreground">Temporarily disable access to the platform</p>
                        </div>
                        <Switch onChange={(checked) => console.log("Maintenance mode:", checked)} />
                      </div>

                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>Customize the look and feel of the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Theme</label>
                        <Select defaultValue="light">
                          <SelectTrigger>
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System Default</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Primary Color</label>
                        <Select defaultValue="blue">
                          <SelectTrigger>
                            <SelectValue placeholder="Select primary color" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                            <SelectItem value="purple">Purple</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                            <SelectItem value="orange">Orange</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Logo</label>
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-8 w-8"
                            >
                              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                              <path d="M12 3v6" />
                            </svg>
                          </div>
                          <Button variant="outline">Upload New Logo</Button>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Favicon</label>
                        <div className="flex items-center gap-4">
                          <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                              <path d="M12 3v6" />
                            </svg>
                          </div>
                          <Button variant="outline">Upload New Favicon</Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">Custom CSS</h3>
                          <p className="text-sm text-muted-foreground">Add custom CSS to override default styles</p>
                        </div>
                        <Switch onChange={(checked) => console.log("Custom CSS enabled:", checked)} />
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Custom CSS Code</label>
                        <Textarea rows={6} placeholder="/* Add your custom CSS here */" />
                      </div>

                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Configure system and email notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-medium mb-4">Email Notifications</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium">New User Registration</h4>
                              <p className="text-sm text-muted-foreground">Send email when a new user registers</p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium">Course Enrollment</h4>
                              <p className="text-sm text-muted-foreground">
                                Send email when a student enrolls in a course
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium">Payment Received</h4>
                              <p className="text-sm text-muted-foreground">Send email when a payment is received</p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium">Course Completion</h4>
                              <p className="text-sm text-muted-foreground">
                                Send email when a student completes a course
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-medium mb-4">System Notifications</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium">Low Disk Space</h4>
                              <p className="text-sm text-muted-foreground">Notify when server disk space is low</p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium">Failed Login Attempts</h4>
                              <p className="text-sm text-muted-foreground">Notify on multiple failed login attempts</p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium">Database Backup</h4>
                              <p className="text-sm text-muted-foreground">Notify on successful database backups</p>
                            </div>
                            <Switch onChange={(checked) => console.log("Setting changed:", checked)} />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium">System Updates</h4>
                              <p className="text-sm text-muted-foreground">Notify when system updates are available</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Configure security and authentication settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-medium mb-4">Authentication</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                              <p className="text-sm text-muted-foreground">Require 2FA for all admin users</p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="grid gap-2">
                            <label className="text-sm font-medium">Password Policy</label>
                            <Select defaultValue="strong">
                              <SelectTrigger>
                                <SelectValue placeholder="Select password policy" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                                <SelectItem value="medium">Medium (8+ chars, letters & numbers)</SelectItem>
                                <SelectItem value="strong">
                                  Strong (8+ chars, upper/lowercase, numbers, symbols)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid gap-2">
                            <label className="text-sm font-medium">Session Timeout (minutes)</label>
                            <Input
                              type="number"
                              defaultValue="30"
                              onChange={(e) => console.log("Session timeout changed:", e.target.value)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium">CAPTCHA on Login</h4>
                              <p className="text-sm text-muted-foreground">Require CAPTCHA on login attempts</p>
                            </div>
                            <Switch onChange={(checked) => console.log("Setting changed:", checked)} />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-medium mb-4">Data Protection</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium">Data Encryption</h4>
                              <p className="text-sm text-muted-foreground">Encrypt sensitive data in the database</p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium">Automatic Backups</h4>
                              <p className="text-sm text-muted-foreground">Schedule regular database backups</p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="grid gap-2">
                            <label className="text-sm font-medium">Backup Frequency</label>
                            <Select defaultValue="daily">
                              <SelectTrigger>
                                <SelectValue placeholder="Select backup frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hourly">Hourly</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
