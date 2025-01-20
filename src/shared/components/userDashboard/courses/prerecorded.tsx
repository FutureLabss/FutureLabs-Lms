import { useState, useEffect, useRef } from 'react'
import { Check, Play, MoreVertical, ChevronDown, Pause } from 'lucide-react'
import Tabs from '../../tabs'
import { tabs } from './courseinfo'
import { useRouter } from 'next/router'
import { prerecordedCourses, type Section } from '@/core/const/userdashboard/courses/prerecorded'

interface SelectedLesson {
  sectionId: string
  lessonIndex: number
  title: string
  src: string
}

export default function PrerecordedComponent() {
  const [expandedSectionIndex, setExpandedSectionIndex] = useState<number>(0)
  const [selectedLesson, setSelectedLesson] = useState<SelectedLesson | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLIFrameElement>(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (prerecordedCourses.sections.length > 0 && prerecordedCourses.sections[0].lessons.length > 0) {
      const firstSection = prerecordedCourses.sections[0]
      const firstLesson = firstSection.lessons[0]
      setSelectedLesson({
        sectionId: firstSection.id,
        lessonIndex: 0,
        title: firstLesson.title,
        src: firstLesson.src
      })
    }
  }, [])

  const currentSection = prerecordedCourses.sections.find(
    (section) => section.id === id
  )

  const handleLessonClick = (section: Section, lessonIndex: number) => {
    setSelectedLesson({
      sectionId: section.id,
      lessonIndex,
      title: section.lessons[lessonIndex].title,
      src: section.lessons[lessonIndex].src
    })
    setIsPlaying(false)
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      } else {
        videoRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
      }
      setIsPlaying(!isPlaying)
    }
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&controls=1`
  }

  if (!currentSection) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-700">Course not found</h1>
      </div>
    )
  }

  const toggleSection = (index: number) => {
    setExpandedSectionIndex(expandedSectionIndex === index ? -1 : index)
  }

  return (
    // <div className=" bg-white border border-red-500 min-h-screen">
      <div className="grid grid-cols-3 grid-rows-1 mt-[3rem] gap-10 ">
        {/* Main Content */}
        <div className="p-8 col-span-2 bg-white ">
          {selectedLesson ? (
            <>
              <h1 className="text-xl font-semibold text-gray-600 mb-2">
                {prerecordedCourses.sections.find((section) => section.id === selectedLesson.sectionId)?.courseTitle.title}
              </h1>
              <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden mb-8">
                <iframe 
                  ref={videoRef}
                  src={getYouTubeEmbedUrl(selectedLesson.src)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div 
                  className={`absolute inset-0 flex items-center justify-center ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'} transition-opacity`}
                >
                  <button 
                    onClick={togglePlayPause}
                    className="bg-white/90 p-4 rounded-full hover:bg-white transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-gray-900" />
                    ) : (
                      <Play className="w-6 h-6 text-gray-900" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-10 ">
                <Tabs tabs={tabs} justify="justify-start" />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-lg">Loading course content...</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="bg-gray-50 border-l p-6 w-full border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Course Content</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">Menu</span>
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-1">
            {prerecordedCourses.sections.map((section, index) => (
              <div key={section.id} className="rounded-lg">
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full py-4 flex items-start justify-between group"
                >
                  <div className="flex flex-row gap-2 justify-between w-full max-w-[800px]">
                    <div className="">
                      <h3 className="font-medium  text-left text-gray-900">
                        {section.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {section.totalItems} · {section.duration}
                      </p>
                    </div>
                    <div className='mt-2'>
                      <ChevronDown 
                        className={`h-7 w-7 text-gray-400 transition-transform ${
                          expandedSectionIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {expandedSectionIndex === index && (
                  <div className="mt-1 space-y-5">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        onClick={() => handleLessonClick(section, lessonIndex)}
                        className={`flex items-center justify-between cursor-pointer gap-3 p-3 rounded-lg ${
                          selectedLesson?.sectionId === section.id && 
                          selectedLesson?.lessonIndex === lessonIndex
                            ? 'bg-orange-50'
                            : lesson.completed 
                            ? 'bg-orange-50/50 border-l-4 border-l-secondary' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div>
                          <span className={`text-[13px] ${
                            selectedLesson?.sectionId === section.id && 
                            selectedLesson?.lessonIndex === lessonIndex
                              ? 'text-orange-900 font-medium'
                              : lesson.completed 
                              ? 'text-orange-900/75' 
                              : 'text-gray-600'
                          }`}>
                            {lesson.title}
                          </span>
                          <p className={`text-xs ml-auto ${
                            lesson.completed ? 'text-orange-600' : 'text-gray-400'
                          }`}>
                            {lesson.completed ? 'Completed' : 'Pending'}
                          </p>
                        </div>
                        <div className={`rounded-full p-1 ${
                          selectedLesson?.sectionId === section.id && 
                          selectedLesson?.lessonIndex === lessonIndex
                            ? 'text-orange-500'
                            : lesson.completed 
                            ? 'text-orange-500/75' 
                            : 'text-gray-400'
                        }`}>
                          {lesson.completed ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    // </div>
  )
}

