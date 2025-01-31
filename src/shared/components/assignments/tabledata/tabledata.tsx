import { useState } from "react";
import Modal from "../../common/modal/modal";
import { Assignment } from "@/core/types/interface/assignments";
import { TableHeaderActionProp } from "@/core/types/interface/component/table";
import UploadAssignmentsModalContent from "../uploadassigmentmodal";

export default function AssignmentsTableActionComponent(props: TableHeaderActionProp<Assignment>) {
  const [open, setOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const handleModalOpen = (assignment: Assignment)=>{
    setSelectedAssignment(assignment);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedAssignment(null);
  };

  const isSubmissionAllowed = (assignment: Assignment) => {
    const currentDate = new Date();
    const dueDate = new Date(assignment.dueDate);
    return currentDate <= dueDate || assignment.allowLateSubmission;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4">
        <span
          className={`cursor-pointer text-center 
            ${
              isSubmissionAllowed(props.item!)
                ? props.item?.submit === "Submitted"
                  ? "text-green-600 font-bold text-sm"
                  : "text-gray-600 font-normal text-sm"
                : "text-gray-400 italic font-normal text-sm"
            }`}
          onClick={() => isSubmissionAllowed(props.item!) && handleModalOpen(props.item!)}
        >
          {isSubmissionAllowed(props.item!) ? props.item?.submit : "Submission Closed"}
        </span>
      </div>

      {open && selectedAssignment && (
        <Modal isOpen={open} onClose={handleCloseModal} displayClose={false} title="">
          {selectedAssignment.submit === "Upload" && (
            <div>
              <UploadAssignmentsModalContent />
            </div>
          )}
          {selectedAssignment.submit === "Submitted" && (
            <div>
              <h3>View Submitted Assignment</h3>
              <p>Your assignment was already submitted.</p>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
