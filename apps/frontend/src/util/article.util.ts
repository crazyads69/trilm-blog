import { format } from "date-fns";
// Function to calculate the read time of an article based on its content length
// Assumes an average reading speed of 200 words per minute
export const calculateReadTime = (content: string) => {
  return content ? Math.ceil(content.split(" ").length / 200) : 3;
};

// Function to format the date to a more readable format dd/mm/yyyy hh:mm
export const formatDateTime = (date: string) => {
  return format(new Date(date), "dd/MM/yyyy HH:mm");
};
