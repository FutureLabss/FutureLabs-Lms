"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { NotificationsDropdown } from "./notifications-dropdown"
import { UserProfileDropdown } from "./user-profile-dropdown"

export function ProfileContent() {
  const [activeTab, setActiveTab] = useState("personal")
  const [avatarSrc, setAvatarSrc] = useState("/placeholder.svg?height=96&width=96")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [formData, setFormData] = useState({
    firstName: "Thomas",
    lastName: "Anderson",
    email: "thomas.anderson@example.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "Platform Administrator",
    bio: "Experienced education technology administrator with over 10 years in the field. Passionate about creating effective learning environments and improving educational outcomes through technology.",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarSrc(event.target.result as string)
        }
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }, 1000)
  }

  const handleSaveChanges = () => {
    // Simulate saving
    console.log("Saving profile data:", formData)
    // Here you would typically make an API call to save the data
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full bg-muted pl-8 md:w-[240px] lg:w-[320px]" />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <NotificationsDropdown />
          <UserProfileDropdown />
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
              <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="relative mb-4">
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
                  <AvatarImage src={avatarSrc || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback className="text-lg">{isUploading ? "..." : "TA"}</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                  onClick={handleAvatarClick}
                  disabled={isUploading}
                >
                  {isUploading ? <span className="animate-spin">↻</span> : <Camera className="h-4 w-4" />}
                  <span className="sr-only">Change profile picture</span>
                </Button>
              </div>
              <h2 className="text-xl font-bold">{`${formData.firstName} ${formData.lastName}`}</h2>
              <p className="text-muted-foreground">{formData.jobTitle}</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium" htmlFor="firstName">
                            First Name
                          </label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium" htmlFor="lastName">
                            Last Name
                          </label>
                          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="email">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="phone">
                          Phone Number
                        </label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="jobTitle">
                          Job Title
                        </label>
                        <Input id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} />
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="bio">
                          Bio
                        </label>
                        <Textarea id="bio" name="bio" rows={4} value={formData.bio} onChange={handleInputChange} />
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your password and security preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-medium mb-4">Change Password</h3>
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <label className="text-sm font-medium">Current Password</label>
                            <Input type="password" />
                          </div>

                          <div className="grid gap-2">
                            <label className="text-sm font-medium">New Password</label>
                            <Input type="password" />
                          </div>

                          <div className="grid gap-2">
                            <label className="text-sm font-medium">Confirm New Password</label>
                            <Input type="password" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-medium mb-4">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Add an extra layer of security to your account
                        </p>
                        <Button variant="outline">Enable Two-Factor Authentication</Button>
                      </div>

                      <div>
                        <h3 className="text-base font-medium mb-4">Login Sessions</h3>
                        <p className="text-sm text-muted-foreground mb-4">Manage your active sessions</p>
                        <div className="rounded-md border">
                          <div className="p-4 border-b">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">Chrome on Windows</h4>
                                <p className="text-sm text-muted-foreground">Current session</p>
                              </div>
                              <Button variant="ghost" size="sm" disabled>
                                Current
                              </Button>
                            </div>
                          </div>
                          <div className="p-4 border-b">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">Safari on macOS</h4>
                                <p className="text-sm text-muted-foreground">Last active: 2 days ago</p>
                              </div>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                Revoke
                              </Button>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">Chrome on iPhone</h4>
                                <p className="text-sm text-muted-foreground">Last active: 5 days ago</p>
                              </div>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                Revoke
                              </Button>
                            </div>
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

              <TabsContent value="preferences" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Customize your experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Email Notifications</h4>
                            <p className="text-sm text-muted-foreground">Receive email notifications</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium">Off</label>
                            <input
                              type="checkbox"
                              className="toggle"
                              defaultChecked
                              onChange={(e) => console.log("Email notifications:", e.target.checked)}
                            />
                            <label className="text-sm font-medium">On</label>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Push Notifications</h4>
                            <p className="text-sm text-muted-foreground">Receive push notifications</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium">Off</label>
                            <input
                              type="checkbox"
                              className="toggle"
                              defaultChecked
                              onChange={(e) => console.log("Push notifications:", e.target.checked)}
                            />
                            <label className="text-sm font-medium">On</label>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Dark Mode</h4>
                            <p className="text-sm text-muted-foreground">Use dark theme</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium">Light</label>
                            <input
                              type="checkbox"
                              className="toggle"
                              onChange={(e) => console.log("Dark mode:", e.target.checked)}
                            />
                            <label className="text-sm font-medium">Dark</label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button>Save Preferences</Button>
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
