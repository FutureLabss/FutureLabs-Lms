"use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useGetAllClassrooms } from "@/shared/hooks/query/classroom/getAllClassroom";
import { useGetMeprofile } from "@/shared/hooks/query/users";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export default function WelcomePage() {
  const router = useRouter();
  const { data: classroomsData } = useGetAllClassrooms();
  const { data: user } = useGetMeprofile();
  const userName = user?.data.fullname || "Student";

  if ((classroomsData?.data ?? []).length > 0) {
    router.push("/user");
    return null;
  }
  //   const [loading, setLoading] = useState(true);
  //   const [hasClass, setHasClass] = useState<boolean | null>(null);
  //   const [userName, setUserName] = useState("Student");

  // Simulate checking if student has been assigned a class
  //   useEffect(() => {
  //     const checkClassAssignment = async () => {
  //       try {
  //         // This would be replaced with an actual API call to check class assignment
  //         // For demo purposes, we'll simulate a response after a delay
  //         setTimeout(() => {
  //           // For demo, randomly determine if student has a class
  //           // In production, this would be an actual API response
  //           const mockHasClass = Math.random() > 0.5;
  //           setHasClass(mockHasClass);
  //           setUserName("Peter Ime"); // In production, get from user profile
  //           setLoading(false);
  //         }, 1500);
  //       } catch (error) {
  //         console.error("Error checking class assignment:", error);
  //         setHasClass(false);
  //         setLoading(false);
  //       }
  //     };

  //     checkClassAssignment();
  //   }, []);

  //   console.log("Classrooms Data:", classroomsData);
  const handleGoToDashboard = () => {
    router.push("/user");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      {/* <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex items-center">
          <div className="w-40">
            <Image
              src="/placeholder.svg?height=40&width=160"
              alt="FUTURELABS"
              width={160}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold">
              Welcome to FUTURELABS, {userName}! 👋
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Thank you for signing up. Your account has been created
              successfully.
            </CardDescription>
          </CardHeader>
          {classroomsData ? (
            <CardContent className="pt-6">
              {classroomsData?.data.length > 0 ? (
                <div className="text-center space-y-6">
                  <div className="bg-green-50 rounded-lg p-6 flex flex-col items-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-semibold text-green-700">
                      You&apos;ve been assigned to a class!
                    </h3>
                    <p className="text-green-600 mt-2">
                      You&apos;re all set to start your learning journey. Click
                      the button below to access your dashboard.
                    </p>
                  </div>

                  <Button
                    size="lg"
                    className="w-full md:w-auto md:px-12 bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={handleGoToDashboard}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="bg-amber-50 rounded-lg p-6 flex flex-col items-center">
                    <AlertCircle className="h-16 w-16 text-amber-500 mb-4" />
                    <h3 className="text-xl font-semibold text-amber-700">
                      No Class Found
                    </h3>
                    <p className="text-amber-600 mt-2">
                      It looks like you haven&apos;t been assigned to a class
                      yet. Please contact an administrator to help assign you to
                      the appropriate class.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* <Button
                    variant="outline"
                    size="lg"
                    className="w-full md:w-auto md:px-12"
                    asChild 
                  >
                    <Link href="/support">Contact Administrator</Link>
                  </Button> */}

                    <p className="text-sm text-gray-500">
                      Please email support at{" "}
                      <a
                        href="mailto:support@futurelabs.com"
                        className="text-orange-500 hover:underline"
                      >
                        support@futurelabs.com
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          ) : null}
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} FUTURELABS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
