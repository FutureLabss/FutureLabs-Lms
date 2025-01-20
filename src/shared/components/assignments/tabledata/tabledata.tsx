import { useState } from "react";
import Modal from "../../common/modal/modal";
// import { assignmentsData } from "@/core/const/tabledata";

export default function AssignmentsTableActionComponent() {
    const [open, setOpen]=useState(false)
    const handleModalOpen=()=>{
        setOpen(true)
    }
    const handleCloseModal=()=>{
        setOpen(false)
    }
    // let submits = assignmentsData.find((items)=> items.submit  === items.submit)
  return (
    <div className="flex flex-row gap-4">
       <span className="cursor-pointer "  onClick={handleModalOpen}>
       {/* {submits} */}
       </span>
      <div>
        <Modal isOpen={open} onClose={handleCloseModal } displayClose={true} title="Roles Configuration">
            {/* <RoleconfigurationModal /> */}
        </Modal>
      </div>
    </div>
  );
}
