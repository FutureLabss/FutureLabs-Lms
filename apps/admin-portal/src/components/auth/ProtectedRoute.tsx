import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: Array<"admin" | "tutor" | "student">;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { isAuthenticated, userRole } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (userRole && !allowedRoles.includes(userRole)) {
      if (userRole === 'admin') {
        router.push('/users');
      } else if (userRole === 'tutor') {
        router.push('/dashboard');
      } else if (userRole === 'student') {
        router.push('/student-dashboard');
      }
    }
  }, [isAuthenticated, userRole, allowedRoles, router]);

  if (!isAuthenticated || (userRole && !allowedRoles.includes(userRole))) {
    return null; // Return null while redirecting
  }

  // User is authenticated and has the right role
  return <>{children}</>;
};

export default ProtectedRoute;
