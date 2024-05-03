export const dateFormatter = (dateString) => {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = new Date(dateString).toLocaleDateString(
    'en-US',
    options
  );

  return formattedDate;
};
