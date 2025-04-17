export function handleError(e: { response: { data: { message: string; }; }; }): never {
    const message = e.response?.data?.message || "Network Error";
    if (Array.isArray(message)) {
      const error = message.join("\n");
      throw new Error(error);
    }
    throw new Error(message);
  }