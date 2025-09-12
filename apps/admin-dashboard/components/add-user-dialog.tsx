// "use client";

// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { type UserRole, type UserStatus } from "@/lib/types/types";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useCreateUser } from "@/hooks/mutate/users";

// interface AddUserDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export function AddUserDialog({ open, onOpenChange }: AddUserDialogProps) {
//   const addUser = useCreateUser();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "student" as UserRole,
//     program: "",
//     status: "active" as UserStatus,
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     // Clear error when field is edited
//     if (errors[field]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[field];
//         return newErrors;
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.program.trim()) {
//       newErrors.program = "Program is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // const handleSubmit = () => {
//   //   if (!validateForm()) return

//   // Get current date in MM/DD/YYYY format
//   //  const today = new Date()
//   //  const joined = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`

//   //   addUser({
//   //     ...formData,
//   //     joined,
//   //   })

//   //   // Reset form and close dialog
//   //   setFormData({
//   //     name: "",
//   //     email: "",
//   //     role: "student",
//   //     program: "",
//   //     status: "active",
//   //   })
//   //   onOpenChange(false)
//   // }

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     try {
//       const today = new Date();
//       const joined = `${
//         today.getMonth() + 1
//       }/${today.getDate()}/${today.getFullYear()}`;

//       addUser.mutate(
//         {
//           ...formData,
//           joined,
//         },
//         {
//           onError: (error: any) => {
//             console.error(
//               "User creation failed:",
//               error.response?.data || error.message
//             );
//           },
//           onSuccess: () => {
//             console.log("User created successfully");
//           },
//         }
//       );

//       // Reset form and close dialog
//       setFormData({
//         name: "",
//         email: "",
//         role: "student",
//         program: "",
//         status: "active",
//       });
//       onOpenChange(false);
//     } catch (err) {
//       console.error("Error adding user:", err);
//       // optionally show toast or inline error
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>Add New User</DialogTitle>
//         </DialogHeader>

//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name
//             </Label>
//             <div className="col-span-3">
//               <Input
//                 id="name"
//                 value={formData.name}
//                 onChange={(e) => handleChange("name", e.target.value)}
//                 className={errors.name ? "border-red-500" : ""}
//               />
//               {errors.name && (
//                 <p className="mt-1 text-xs text-red-500">{errors.name}</p>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="email" className="text-right">
//               Email
//             </Label>
//             <div className="col-span-3">
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 className={errors.email ? "border-red-500" : ""}
//               />
//               {errors.email && (
//                 <p className="mt-1 text-xs text-red-500">{errors.email}</p>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="role" className="text-right">
//               Role
//             </Label>
//             <Select
//               value={formData.role}
//               onValueChange={(value) => handleChange("role", value)}
//             >
//               <SelectTrigger id="role" className="col-span-3">
//                 <SelectValue placeholder="Select role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="student">Student</SelectItem>
//                 <SelectItem value="tutor">Tutor</SelectItem>
//                 <SelectItem value="admin">Admin</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="program" className="text-right">
//               Program
//             </Label>
//             <div className="col-span-3">
//               <Input
//                 id="program"
//                 value={formData.program}
//                 onChange={(e) => handleChange("program", e.target.value)}
//                 className={errors.program ? "border-red-500" : ""}
//               />
//               {errors.program && (
//                 <p className="mt-1 text-xs text-red-500">{errors.program}</p>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="status" className="text-right">
//               Status
//             </Label>
//             <Select
//               value={formData.status}
//               onValueChange={(value) =>
//                 handleChange("status", value as UserStatus)
//               }
//             >
//               <SelectTrigger id="status" className="col-span-3">
//                 <SelectValue placeholder="Select status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="active">Active</SelectItem>
//                 <SelectItem value="suspended">Suspended</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <DialogFooter>
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit}>Add User</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// "use client";

// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { type UserRole, type UserStatus } from "@/lib/types/types";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useCreateUser } from "@/hooks/mutate/users";

// interface AddUserDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export function AddUserDialog({ open, onOpenChange }: AddUserDialogProps) {
//   const addUser = useCreateUser();
//   const [formData, setFormData] = useState({
//     first_name: "",
//     middle_name: "",
//     surname: "",
//     gender: "",
//     email: "",
//     lga: "",
//     state: "",
//     role: "student",
//     course: "",
//     program: "",
//     status: "",
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[field];
//         return newErrors;
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.first_name.trim()) {
//       newErrors.first_name = "First name is required";
//     }
//     if (!formData.surname.trim()) {
//       newErrors.surname = "Surname is required";
//     }
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }
//     if (!formData.gender) {
//       newErrors.gender = "Gender is required";
//     }
//     if (!formData.course.trim()) {
//       newErrors.course = "Course is required";
//     }
//     if (!formData.role) {
//       newErrors.role = "Role is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     const today = new Date();
//     const joined = `${
//       today.getMonth() + 1
//     }/${today.getDate()}/${today.getFullYear()}`;

//     try {
// addUser.mutate(
//   {
//     surname: formData.surname,
//     first_name: formData.first_name,
//     email: formData.email,
//     gender: formData.gender,
//     state: formData.state,
//     lga: formData.lga,
//     role: formData.role as UserRole,
//     course: formData.course,
//     joined,
//     name: "",
//     program: formData.program,
//     status: formData.status as UserStatus,
//     fullname: "",
//     roles: [],
//   },
//   {
//     onError: (error: any) => {
//       console.error(
//         "User creation failed:",
//         error.response?.data || error.message
//       );
//     },
//     onSuccess: () => {
//       console.log("User created successfully");
//     },
//   }
// );

//       // Reset form and close dialog
// setFormData({
//   first_name: "",
//   middle_name: "",
//   surname: "",
//   gender: "",
//   email: "",
//   lga: "",
//   state: "",
//   role: "student",
//   course: "",
//   program: "",
//   status: "",
// });
//       onOpenChange(false);
//     } catch (err) {
//       console.error("Error adding user:", err);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>Add New User</DialogTitle>
//         </DialogHeader>

//         <div className="grid gap-4 py-4">
//           {/* First Name */}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="first_name" className="text-right">
//               First Name
//             </Label>
//             <div className="col-span-3">
//               <Input
//                 id="first_name"
//                 value={formData.first_name}
//                 onChange={(e) => handleChange("first_name", e.target.value)}
//                 className={errors.first_name ? "border-red-500" : ""}
//               />
//               {errors.first_name && (
//                 <p className="mt-1 text-xs text-red-500">{errors.first_name}</p>
//               )}
//             </div>
//           </div>

//           {/* Middle Name */}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="middle_name" className="text-right">
//               Middle Name
//             </Label>
//             <Input
//               id="middle_name"
//               value={formData.middle_name}
//               onChange={(e) => handleChange("middle_name", e.target.value)}
//             />
//           </div>

//           {/* Surname */}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="surname" className="text-right">
//               Surname
//             </Label>
//             <div className="col-span-3">
//               <Input
//                 id="surname"
//                 value={formData.surname}
//                 onChange={(e) => handleChange("surname", e.target.value)}
//                 className={errors.surname ? "border-red-500" : ""}
//               />
//               {errors.surname && (
//                 <p className="mt-1 text-xs text-red-500">{errors.surname}</p>
//               )}
//             </div>
//           </div>

//           {/* Gender */}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="gender" className="text-right">
//               Gender
//             </Label>
//             <Select
//               value={formData.gender}
//               onValueChange={(value) => handleChange("gender", value)}
//             >
//               <SelectTrigger id="gender" className="col-span-3">
//                 <SelectValue placeholder="Select gender" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="male">Male</SelectItem>
//                 <SelectItem value="female">Female</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//             {errors.gender && (
//               <p className="mt-1 text-xs text-red-500 col-span-4 text-right">
//                 {errors.gender}
//               </p>
//             )}
//           </div>

//           {/* Email */}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="email" className="text-right">
//               Email
//             </Label>
//             <div className="col-span-3">
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 className={errors.email ? "border-red-500" : ""}
//               />
//               {errors.email && (
//                 <p className="mt-1 text-xs text-red-500">{errors.email}</p>
//               )}
//             </div>
//           </div>

//           {/* LGA */}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="lga" className="text-right">
//               LGA
//             </Label>
//             <Input
//               id="lga"
//               value={formData.lga}
//               onChange={(e) => handleChange("lga", e.target.value)}
//             />
//           </div>

//           {/* State */}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="state" className="text-right">
//               State
//             </Label>
//             <Input
//               id="state"
//               value={formData.state}
//               onChange={(e) => handleChange("state", e.target.value)}
//             />
//           </div>

//           {/* Role */}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="role" className="text-right">
//               Role
//             </Label>
//             <Select
//               value={formData.role}
//               onValueChange={(value) => handleChange("role", value)}
//             >
//               <SelectTrigger id="role" className="col-span-3">
//                 <SelectValue placeholder="Select role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="student">Student</SelectItem>
//                 <SelectItem value="tutor">Tutor</SelectItem>
//                 <SelectItem value="admin">Admin</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Course */}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="course" className="text-right">
//               Course
//             </Label>
//             <div className="col-span-3">
//               <Input
//                 id="course"
//                 value={formData.course}
//                 onChange={(e) => handleChange("course", e.target.value)}
//                 className={errors.course ? "border-red-500" : ""}
//               />
//               {errors.course && (
//                 <p className="mt-1 text-xs text-red-500">{errors.course}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         <DialogFooter>
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit}>Add User</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { type UserRole, type UserStatus } from "@/lib/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateUser } from "@/hooks/mutate/users";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddUserDialog({ open, onOpenChange }: AddUserDialogProps) {
  const addUser = useCreateUser();
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    surname: "",
    gender: "",
    email: "",
    lga: "",
    state: "",
    role: "student",
    course: "",
    program: "",
    status: "active",
    roles: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.surname.trim()) newErrors.surname = "Surname is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.course.trim()) newErrors.course = "Course is required";
    if (!formData.role) newErrors.role = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const today = new Date();
    const joined = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;

    try {
      addUser.mutate(
        {
          surname: formData.surname,
          first_name: formData.first_name,
          email: formData.email,
          gender: formData.gender,
          state: formData.state,
          lga: formData.lga,
          role: formData.role as UserRole,
          course: formData.course,
          joined,
          name: "",
          program: formData.program,
          status: formData.status as UserStatus,
          roles: [],
        },
        {
          onError: (error: any) => {
            console.error(
              "User creation failed:",
              error.response?.data || error.message
            );
          },
          onSuccess: () => {
            console.log("User created successfully");
          },
        }
      );
      // Reset form and close dialog
      setFormData({
        first_name: "",
        middle_name: "",
        surname: "",
        gender: "",
        email: "",
        lga: "",
        state: "",
        role: "student",
        course: "",
        program: "",
        status: "",
        roles: [],
      });
      onOpenChange(false);
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* First Name */}
          <InputField
            id="first_name"
            label="First Name"
            value={formData.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
            error={errors.first_name}
          />

          {/* Middle Name */}
          <InputField
            id="middle_name"
            label="Middle Name"
            value={formData.middle_name}
            onChange={(e) => handleChange("middle_name", e.target.value)}
          />

          {/* Surname */}
          <InputField
            id="surname"
            label="Surname"
            value={formData.surname}
            onChange={(e) => handleChange("surname", e.target.value)}
            error={errors.surname}
          />

          {/* Gender */}
          <SelectField
            id="gender"
            label="Gender"
            value={formData.gender}
            onChange={(val) => handleChange("gender", val)}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            error={errors.gender}
          />

          {/* Email */}
          <InputField
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
          />

          {/* State */}
          <InputField
            id="state"
            label="State"
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />

          {/* LGA */}
          <InputField
            id="lga"
            label="LGA"
            value={formData.lga}
            onChange={(e) => handleChange("lga", e.target.value)}
          />

          {/* Course */}
          <InputField
            id="course"
            label="Course"
            value={formData.course}
            onChange={(e) => handleChange("course", e.target.value)}
            error={errors.course}
          />

          {/* Program */}
          <InputField
            id="program"
            label="Program"
            value={formData.program}
            onChange={(e) => handleChange("program", e.target.value)}
          />

          {/* Role */}
          <SelectField
            id="role"
            label="Role"
            value={formData.role}
            onChange={(val) => handleChange("role", val)}
            options={[
              { value: "student", label: "Student" },
              { value: "tutor", label: "Tutor" },
              { value: "admin", label: "Admin" },
            ]}
          />

          {/* Status */}
          <SelectField
            id="status"
            label="Status"
            value={formData.status}
            onChange={(val) => handleChange("status", val)}
            options={[
              { value: "active", label: "Active" },
              { value: "suspended", label: "Suspended" },
              { value: "pending", label: "Pending" },
            ]}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* Small reusable components */
function InputField({
  id,
  label,
  value,
  onChange,
  type = "text",
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
}) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <div className="col-span-3">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={error ? "border-red-500" : ""}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  error?: string;
}) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="col-span-3">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="mt-1 text-xs text-red-500 col-span-4 text-right">
          {error}
        </p>
      )}
    </div>
  );
}
