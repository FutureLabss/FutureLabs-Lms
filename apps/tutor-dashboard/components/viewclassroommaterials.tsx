import CourseCardSkeleton from '@/app/(dashboard)/classes/[id]/loading';
import { useGetAllClassroomMaterials } from '@/hooks/query/classroom';
import React from 'react'
interface Iprops{
    classId:string
}

export default function ViewClassRoomMaterials({classId}:Iprops) {
         const {
        data: allClassroomMaterials,
        loading,
        error: allClassroomMaterialsrror,
      } = useGetAllClassroomMaterials(Number(classId), !!Number(classId));
        console.log({allClassroomMaterials})
          const materials = allClassroomMaterials?.data|| [];
  return (
    <div>
         {loading ? (
                    <CourseCardSkeleton />
                  ) : materials.length === 0 ? (
                    <div className="text-center text-muted-foreground py-6">
                      No materials found for this ClassRoom.
                    </div>
                  ) : (
                    materials.map((material) => (
                      <div
                        key={material.title}
                        className="flex items-center justify-between p-4"
                      >
                        <div>
                          <p className="font-medium">{material.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {material.type.toUpperCase()} • Added on{" "}
                            {/* Optional: format date if needed */}
                            {/* new Date(material.created_at).toLocaleDateString() */}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
      
    </div>
  )
}
