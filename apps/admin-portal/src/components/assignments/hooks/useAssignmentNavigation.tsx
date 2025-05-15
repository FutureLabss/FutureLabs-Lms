import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useAssignmentNavigation = (
  isEditModalOpen: boolean, 
  setIsEditModalOpen: (open: boolean) => void,
  router: ReturnType<typeof useRouter>
) => {
  const searchParams = useSearchParams();
  
  // Check for edit=true in URL params
  useEffect(() => {
    const edit = searchParams.get('edit');
    if (edit === 'true' && !isEditModalOpen) {
      setIsEditModalOpen(true);
    }
  }, [searchParams, isEditModalOpen, setIsEditModalOpen]);

  const handleBackToAssignments = () => {
    // In Next.js, we can use the referrer header or maintain state in a different way
    // For now, we'll just navigate to the assignments page
    router.push("/assignments");
  };

  const handleCreateAssignment = () => {
    router.push("/assignments?create=true");
  };

  return {
    handleBackToAssignments,
    handleCreateAssignment
  };
};
