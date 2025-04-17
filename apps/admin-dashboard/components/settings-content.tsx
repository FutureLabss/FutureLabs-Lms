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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState("account")

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
              <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>
          </div>

          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Admin User" />
                          <AvatarFallback>AU</AvatarFallback>
                        </Avatar>
                        <div>
                          <Button variant="outline" size="sm">
                            Change Avatar
                          </Button>
                          <p className="mt-1 text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 800K</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">First Name</label>
                          <Input
                            defaultValue="Thomas"
                            onChange={(e) => console.log("First name changed:", e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Last Name</label>
                          <Input
                            defaultValue="Anderson"
                            onChange={(e) => console.log("Last name changed:", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                          type="email"
                          defaultValue="thomas.anderson@example.com"
                          onChange={(e) => console.log("Email changed:", e.target.value)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Password</label>
                        <Input
                          type="password"
                          defaultValue="••••••••••••"
                          onChange={(e) => console.log("Password changed:", e.target.value)}
                        />
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
                    <CardDescription>Customize the look and feel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">Dark Mode</h3>
                          <p className="text-sm text-muted-foreground">Enable dark mode</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Theme</label>
                        <Select defaultValue="system">
                          <SelectTrigger>
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Font Size</label>
                        <Select defaultValue="medium">
                          <SelectTrigger>
                            <SelectValue placeholder="Select font size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
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
                    <CardDescription>Manage your notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-base font-medium">Email Notifications</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">New User Registration</h4>
                            <p className="text-sm text-muted-foreground">Receive an email when a new user registers</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Course Enrollment</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive an email when a student enrolls in a course
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Payment Notifications</h4>
                            <p className="text-sm text-muted-foreground">Receive an email for payment events</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-base font-medium">Push Notifications</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">New Messages</h4>
                            <p className="text-sm text-muted-foreground">Receive push notifications for new messages</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">System Updates</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive push notifications for system updates
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Manage your privacy preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-base font-medium">Data Sharing</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Share Usage Data</h4>
                            <p className="text-sm text-muted-foreground">
                              Share anonymous usage data to help improve our services
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Third-Party Integrations</h4>
                            <p className="text-sm text-muted-foreground">
                              Allow third-party services to access your data
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-base font-medium">Account Privacy</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Profile Visibility</h4>
                            <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Activity Status</h4>
                            <p className="text-sm text-muted-foreground">Show when you're active on the platform</p>
                          </div>
                          <Switch defaultChecked />
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
