// export function handleError(e: any): never {
//   const message = e.response?.data?.message || "Network Error";
//   if (Array.isArray(message)) {
//     const error = message.join("\n");
//     throw new Error(error);
//   }
//   throw new Error(message);
// }

export function handleError(e: any): never {
  let message = "Network Error"

  // Check if we have a response with data
  if (e.response?.data) {
    const data = e.response.data

    // If there are validation errors in the errors object
    if (data.errors && typeof data.errors === "object") {
      // Get the first error message from the errors object
      const firstErrorKey = Object.keys(data.errors)[0]
      if (firstErrorKey && Array.isArray(data.errors[firstErrorKey]) && data.errors[firstErrorKey].length > 0) {
        message = data.errors[firstErrorKey][0]
      } else {
        message = data.message || "Validation errors occurred"
      }
    }
    // If there's a direct message
    else if (data.message) {
      if (Array.isArray(data.message)) {
        message = data.message.join("\n")
      } else {
        message = data.message
      }
    }
  }
  // Fallback to error message if no response data
  else if (e.message) {
    message = e.message
  }

  throw new Error(message)
}

