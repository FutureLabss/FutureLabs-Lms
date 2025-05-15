import React from 'react'
import { Card, CardContent } from './ui/card'
import { useGetAllClasscroomMaterials } from '@/hooks/query/classroom'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { Link, MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'


interface MaterialsProps{
    classId: string,
    selectedTopic:any,
}
export default function DisplayMaterialDetails(props:MaterialsProps) {
    const {classId, selectedTopic} = props
    const {data: getMaterials}=useGetAllClasscroomMaterials(classId, selectedTopic)
    console.log(getMaterials, "materials")
    console.log(getMaterials, "materialsdddd topicddd id")
  return (
    <div>
      <Card>
<CardContent className="p-0">
    <div className="divide-y">
        {getMaterials && getMaterials.data.map((material) => (
        <div key={material.title} className="flex items-center justify-between p-4">
            <div>
            <p className="font-medium">{material.title}</p>
            <p className="text-sm text-muted-foreground">
                {material.type.toUpperCase()} • Added on{" "}
                {/* {new Date(material.created_at).toLocaleDateString()} */}
            </p>
            </div>
            <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
                <Link href={material.url}>View</Link>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Download</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                    Delete
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
        ))}
    </div>
    </CardContent>
    </Card>
    </div>
  )
}
