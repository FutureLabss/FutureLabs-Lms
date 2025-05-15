"use client"

import { useState } from "react"
import { Edit, Star, Trash2, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { type User, useUsers } from "./user-provider"
import { EditUserDialog } from "./edit-user-dialog"

interface UserTableProps {
  users: User[]
}

export function UserTable({ users }: UserTableProps) {
  const { deleteUser } = useUsers()
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [userToEdit, setUserToEdit] = useState<User | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (userId: string) => {
    setFavorites((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete)
      setUserToDelete(null)
    }
  }

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs font-medium"
      case "tutor":
        return "bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium"
      default:
        return "text-gray-600 text-sm"
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
      case "suspended":
        return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
      case "pending":
        return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"
      default:
        return ""
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Program</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Joined</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-3 text-sm">{user.name}</td>
                <td className="px-4 py-3 text-sm">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={getRoleBadgeClass(user.role)}>{user.role}</span>
                </td>
                <td className="px-4 py-3 text-sm">{user.program}</td>
                <td className="px-4 py-3 text-sm">{user.joined}</td>
                <td className="px-4 py-3">
                  <span className={getStatusBadgeClass(user.status)}>{user.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setUserToEdit(user)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => toggleFavorite(user.id)}>
                      <Star
                        className={`h-4 w-4 ${favorites.includes(user.id) ? "fill-yellow-400 text-yellow-400" : ""}`}
                      />
                      <span className="sr-only">Favorite</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setUserToDelete(user.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Delete</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setUserToEdit(user)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleFavorite(user.id)}>
                          {favorites.includes(user.id) ? "Remove from favorites" : "Add to favorites"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onClick={() => setUserToDelete(user.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user and remove their data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {userToEdit && (
        <EditUserDialog user={userToEdit} open={!!userToEdit} onOpenChange={(open) => !open && setUserToEdit(null)} />
      )}
    </>
  )
}
