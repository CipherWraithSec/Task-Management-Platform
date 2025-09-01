// Get a user-friendly error message from the api response
export const getErrorMessage = (response: any) => {
  if (response?.message) {
    // Check if the message is an array from class-validator middleware
    if (Array.isArray(response.message)) {
      return formatErrorMessage(response.message[0]);
    }
    return formatErrorMessage(response.message);
  }
  return "An error occurred";
};

// Capitalize the first letter of the error message
const formatErrorMessage = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};
