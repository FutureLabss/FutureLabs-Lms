import { toast } from "sonner";

export async function uploadToCloudinary(
  file: File
): Promise<{ secure_url: string; public_id: string }> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET; // Default preset if not set

  try {
    // Create a FormData instance
    const formData = new FormData();
    formData.append("file", file);
    if (presetName) {
      formData.append("upload_preset", presetName);
    } else {
      toast("Error", {
        description: "Cloudinary upload preset is not defined.",
      });
    }

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, // Replace with your cloud name
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}
