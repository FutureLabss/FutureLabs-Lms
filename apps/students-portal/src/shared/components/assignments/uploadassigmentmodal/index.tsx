import { Upload } from "lucide-react"
import { useState } from "react"
import drive from "../../../../assets/assignments/drive.png"
import icons from "../../../../assets/assignments/Icons.png"
import Image from "next/image"

export default function UploadAssignmentsModalContent() {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    }
  }

  return (
    <div className="">
      <div className="pb-8 ">
        <h3 className="text-lg font-semibold">Upload Projects</h3>
        <p className="text-sm  mt-1 w-full max-w-[50px]">
          Please upload files in pdf, docx or doc format and make sure the file size is under 25 MB.
        </p>
      </div>

      <div
        className={`border-2 border-dashed border-secondary rounded-lg p-8 text-center ${
          dragActive ? "border-primary bg-primary/5" : "border-border"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm font-medium">Drop file or Browse</p>
          <p className="text-sm text-muted-foreground">Format: pdf, docx, doc & Max file size: 25 MB</p>
        </div>
      </div>

      <div className="space-y-2 bg-[#E6E7EA] mt-3 rounded-lg p-3">
        <div className="flex items-center justify-center pt-4 py-2">
      <button  className={` flex items-center gap-3 justify-center text-sm px-4 py-[10px] text-secondary rounded-full bg-white 
        w-full max-w-[400px]`}>
      <Image src={icons} alt="icons Logo" className="w-5 h-5" />
            Upload Link
          </button>
        </div>
        <div className="flex gap-5 w-full  items-center justify-center md:px-[70px] pb-1 px-1">
          <button  className="flex items-center gap-3 justify-center text-sm px-4 py-[10px]  rounded-full bg-white w-full">
          <Image src={drive} alt="drive Logo" className="w-5 h-5" />
            Upload from Drive
          </button>
          <button  className="flex items-center gap-3 justify-center text-sm px-4 py-[10px] text-secondary 
          rounded-full bg-white w-full">
          <Image src={icons} alt="icons Logo" className="w-5 h-5" />
            Browse
          </button>
        </div>
      <div className="text-center text-sm text-[#6C606C] ">Or Drop files in the drop zone above.</div>
      </div>


      <div className="flex gap-3 w-full  items-center justify-center mt-8 pb-1 px-1">
        <button className="flex-1 text-[1rem] px-4 py-[10px] text-primary font-semibold  rounded-lg bg-white w-full border border-[#E6E7EA]">Cancel</button>
        <button type="submit" className="flex-1 text-[1rem] px-4 py-[10px] text-white  font-semibold rounded-lg bg-secondary w-full">Done</button>
      </div>
    </div>
  )
}

