import React from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useAssignmentDetails } from "@/components/assignments/hooks/useAssignmentDetails";
import BackButton from "@/components/assignments/BackButton";
import AssignmentHeader from "@/components/assignments/AssignmentHeader";
import AssignmentActions from "@/components/assignments/AssignmentActions";
import AssignmentDetailsTabs from "@/components/assignments/AssignmentDetailsTabs";
import AssignmentModals from "@/components/assignments/AssignmentModals";

const AssignmentDetails = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const {
    modules,
    activeTab,
    setActiveTab,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isGradeModalOpen,
    setIsGradeModalOpen,
    isViewSubmissionModalOpen,
    setIsViewSubmissionModalOpen,
    selectedSubmission,
    assignment,
    submissions,
    handleSendReminders,
    handleUploadResource,
    handleViewSubmission,
    handleGradeSubmission,
    handleEditAssignment,
    handleUpdateAssignment,
    handleCloseGradeModal,
    handleDeleteAssignment,
    handleCloseSubmissions,
    handleMarkAsCompleted,
    handleBackToAssignments,
    handleCreateAssignment,
  } = useAssignmentDetails();
  
  if (!assignment) {
    return <div className="container p-8 text-center">Loading assignment details...</div>;
  }

  return (
    <div className="container mx-auto space-y-6 py-6">
      <BackButton onClick={handleBackToAssignments} />

      <AssignmentHeader 
        assignment={assignment}
        modules={modules}
        onEdit={handleEditAssignment}
        onUploadResource={handleUploadResource}
        onDelete={() => setIsDeleteDialogOpen(true)}
        onCreateAssignment={handleCreateAssignment}
      />
      
      <AssignmentActions 
        assignment={assignment} 
        onMarkAsCompleted={handleMarkAsCompleted} 
      />
      
      <AssignmentDetailsTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        assignment={assignment}
        submissions={submissions}
        onSendReminders={handleSendReminders}
        onGradeSubmission={handleGradeSubmission}
        onViewSubmission={handleViewSubmission}
      />
      
      <AssignmentModals 
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        isGradeModalOpen={isGradeModalOpen}
        setIsGradeModalOpen={setIsGradeModalOpen}
        isViewSubmissionModalOpen={isViewSubmissionModalOpen}
        setIsViewSubmissionModalOpen={setIsViewSubmissionModalOpen}
        selectedSubmission={selectedSubmission}
        assignment={assignment}
        modules={modules}
        id={id}
        handleUpdateAssignment={handleUpdateAssignment}
        handleDeleteAssignment={handleDeleteAssignment}
        handleCloseSubmissions={handleCloseSubmissions}
        handleCloseGradeModal={handleCloseGradeModal}
        location={searchParams}
        navigate={router}
      />
    </div>
  );
};

export default AssignmentDetails;
