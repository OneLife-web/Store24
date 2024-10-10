export const generateOrderId = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString(); // Generates an 8-digit number
};

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
