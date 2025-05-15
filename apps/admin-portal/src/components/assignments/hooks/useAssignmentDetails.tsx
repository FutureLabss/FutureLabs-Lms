import { useParams, useRouter, usePathname } from "next/navigation";
import { useAssignmentsData } from "./useAssignmentsData";
import { useAssignmentState } from "./useAssignmentState";
import { useFetchAssignmentData } from "./useFetchAssignmentData";
import { useAssignmentNavigation } from "./useAssignmentNavigation";
import { useAssignmentActions } from "./useAssignmentActions";

export const useAssignmentDetails = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const pathname = usePathname();
  const { assignments, modules } = useAssignmentsData();
  
  const {
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
    setSelectedSubmission,
    assignment,
    setAssignment,
    submissions,
    setSubmissions,
  } = useAssignmentState();
  
  // Fetch assignment data
  useFetchAssignmentData(id, assignments, setAssignment, setSubmissions);
  
  // Handle navigation
  const {
    handleBackToAssignments,
    handleCreateAssignment
  } = useAssignmentNavigation(isEditModalOpen, setIsEditModalOpen, router);
  
  // Handle actions
  const {
    handleSendReminders,
    handleUploadResource,
    handleViewSubmission,
    handleGradeSubmission,
    handleEditAssignment,
    handleUpdateAssignment,
    handleCloseGradeModal,
    handleDeleteAssignment,
    handleCloseSubmissions,
    handleMarkAsCompleted
  } = useAssignmentActions(
    assignment,
    setAssignment,
    selectedSubmission,
    setSelectedSubmission,
    setIsViewSubmissionModalOpen,
    setIsGradeModalOpen,
    setIsEditModalOpen,
    setIsDeleteDialogOpen,
    router
  );

  return {
    id,
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
    pathname,
    router
  };
};
