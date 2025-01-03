
export default function UserDashboardPreRecordedClasses(){
    return(
        <div className="bg-white p-4 rounded-lg shadow mt-6">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-background text-2xl">Pre-recorded courses</h3>
          <button className="text-black text-sm font-bold">View All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {.map((index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg shadow">
                <img
                  src="/course-thumbnail.jpg"
                  alt="Course Thumbnail"
                  className="w-full rounded-md mb-2"
                />
                <p className="text-sm font-semibold">
                  Beginner's Guide to Becoming A Designer
                </p>
                <span className="text-xs text-gray-500">Pre-recorded</span>
              </div>
            ))}
        </div>
      </div>
    )
}