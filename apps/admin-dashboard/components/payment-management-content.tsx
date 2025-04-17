"use client"

import { useState } from "react"
import { Bell, Download, Filter, Plus, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function PaymentManagementContent() {
  const [activeTab, setActiveTab] = useState("transactions")

  // Sample transactions data
  const transactions = [
    {
      id: "TX123456",
      date: "2023-10-15",
      student: "Alex Johnson",
      email: "alex.j@example.com",
      course: "UI Design Fundamentals",
      amount: 199.99,
      status: "completed",
    },
    {
      id: "TX123457",
      date: "2023-10-14",
      student: "Jamie Smith",
      email: "jamie.smith@example.com",
      course: "Frontend Development 101",
      amount: 149.99,
      status: "completed",
    },
    {
      id: "TX123458",
      date: "2023-10-13",
      student: "Taylor Brown",
      email: "taylor.brown@example.com",
      course: "Design Systems Workshop",
      amount: 99.99,
      status: "pending",
    },
    {
      id: "TX123459",
      date: "2023-10-12",
      student: "Morgan Lee",
      email: "morgan.lee@example.com",
      course: "React Advanced Patterns",
      amount: 249.99,
      status: "failed",
    },
    {
      id: "TX123460",
      date: "2023-10-11",
      student: "Jordan Rivers",
      email: "jordan.rivers@example.com",
      course: "Mobile App Development",
      amount: 299.99,
      status: "completed",
    },
  ]

  // Sample invoices data
  const invoices = [
    {
      id: "INV123456",
      date: "2023-10-15",
      dueDate: "2023-10-30",
      student: "Alex Johnson",
      email: "alex.j@example.com",
      amount: 199.99,
      status: "paid",
    },
    {
      id: "INV123457",
      date: "2023-10-14",
      dueDate: "2023-10-29",
      student: "Jamie Smith",
      email: "jamie.smith@example.com",
      amount: 149.99,
      status: "paid",
    },
    {
      id: "INV123458",
      date: "2023-10-13",
      dueDate: "2023-10-28",
      student: "Taylor Brown",
      email: "taylor.brown@example.com",
      amount: 99.99,
      status: "pending",
    },
    {
      id: "INV123459",
      date: "2023-10-12",
      dueDate: "2023-10-27",
      student: "Morgan Lee",
      email: "morgan.lee@example.com",
      amount: 249.99,
      status: "overdue",
    },
    {
      id: "INV123460",
      date: "2023-10-11",
      dueDate: "2023-10-26",
      student: "Jordan Rivers",
      email: "jordan.rivers@example.com",
      amount: 299.99,
      status: "paid",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
        return <Badge className="bg-green-500">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "failed":
      case "overdue":
        return <Badge className="bg-red-500">Failed</Badge>
      default:
        return null
    }
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
              <h1 className="text-2xl font-bold tracking-tight">Payment Management</h1>
              <p className="text-muted-foreground">Manage transactions, invoices, and payment settings</p>
            </div>
          </div>

          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="settings">Payment Settings</TabsTrigger>
              </TabsList>

              <div className="mt-6 grid gap-6 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <CardDescription>Current month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$24,500</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+8%</span> from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                    <CardDescription>Awaiting completion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$3,250</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-yellow-500">5</span> transactions
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
                    <CardDescription>Require attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,800</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-red-500">3</span> transactions
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Order</CardTitle>
                    <CardDescription>Per transaction</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$185</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+12%</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <TabsContent value="transactions" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>View and manage payment transactions</CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="px-4 py-3 text-left text-sm font-medium">Transaction ID</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Student</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Course</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactions.map((transaction) => (
                              <tr key={transaction.id} className="border-b">
                                <td className="px-4 py-3 text-sm font-medium">{transaction.id}</td>
                                <td className="px-4 py-3 text-sm">{transaction.date}</td>
                                <td className="px-4 py-3">
                                  <div>
                                    <div className="font-medium">{transaction.student}</div>
                                    <div className="text-sm text-muted-foreground">{transaction.email}</div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">{transaction.course}</td>
                                <td className="px-4 py-3 text-sm font-medium">${transaction.amount.toFixed(2)}</td>
                                <td className="px-4 py-3">{getStatusBadge(transaction.status)}</td>
                                <td className="px-4 py-3">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        Actions
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>View Details</DropdownMenuItem>
                                      <DropdownMenuItem>Send Receipt</DropdownMenuItem>
                                      <DropdownMenuItem>Issue Refund</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="invoices" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle>Invoices</CardTitle>
                        <CardDescription>Manage and track invoices</CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Invoice
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="px-4 py-3 text-left text-sm font-medium">Invoice ID</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Due Date</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Student</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoices.map((invoice) => (
                              <tr key={invoice.id} className="border-b">
                                <td className="px-4 py-3 text-sm font-medium">{invoice.id}</td>
                                <td className="px-4 py-3 text-sm">{invoice.date}</td>
                                <td className="px-4 py-3 text-sm">{invoice.dueDate}</td>
                                <td className="px-4 py-3">
                                  <div>
                                    <div className="font-medium">{invoice.student}</div>
                                    <div className="text-sm text-muted-foreground">{invoice.email}</div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm font-medium">${invoice.amount.toFixed(2)}</td>
                                <td className="px-4 py-3">{getStatusBadge(invoice.status)}</td>
                                <td className="px-4 py-3">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        Actions
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>View Invoice</DropdownMenuItem>
                                      <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                      <DropdownMenuItem>Download PDF</DropdownMenuItem>
                                      <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Settings</CardTitle>
                    <CardDescription>Configure payment methods and preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Payment Gateways</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Configure payment processors for your platform
                        </p>
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 flex items-center justify-center rounded-md bg-muted">
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
                                  className="h-6 w-6"
                                >
                                  <rect width="20" height="14" x="2" y="5" rx="2" />
                                  <line x1="2" x2="22" y1="10" y2="10" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">Stripe</h4>
                                <p className="text-sm text-muted-foreground">Credit card payments</p>
                              </div>
                            </div>
                            <Badge className="bg-green-500">Connected</Badge>
                          </div>

                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 flex items-center justify-center rounded-md bg-muted">
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
                                  className="h-6 w-6"
                                >
                                  <path d="M17 9V8a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-1" />
                                  <path d="M10 13a2 2 0 0 0 4 0V5a2 2 0 0 0-4 0v8Z" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">PayPal</h4>
                                <p className="text-sm text-muted-foreground">PayPal payments</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Connect
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">Invoice Settings</h3>
                        <p className="text-sm text-muted-foreground mb-4">Configure invoice generation and reminders</p>
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <label className="text-sm font-medium">Invoice Prefix</label>
                            <Input value="INV-" />
                          </div>
                          <div className="grid gap-2">
                            <label className="text-sm font-medium">Payment Terms (days)</label>
                            <Input type="number" value="15" />
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="auto-reminders" className="h-4 w-4" checked />
                            <label htmlFor="auto-reminders" className="text-sm font-medium">
                              Send automatic payment reminders
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button>Save Settings</Button>
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
