const formattedStatus = (message) => {
  if (!message || typeof message !== "string") return "Unknown error";

  return message
    .split(".")
    .map((word) =>
      word.trim().length > 0
        ? word.trim()[0].toUpperCase() + word.trim().slice(1).toLowerCase()
        : ""
    )
    .join(". "); // Menambahkan spasi setelah titik
};

export default formattedStatus;
