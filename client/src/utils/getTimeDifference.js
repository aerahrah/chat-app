export const getTimeDifference = (updatedAt) => {
  const updatedDate = new Date(updatedAt);
  const currentDate = new Date();

  const timeDifferenceMs = currentDate - updatedDate;

  if (timeDifferenceMs < 3600000) {
    // Less than 1 hour
    return `${Math.floor(timeDifferenceMs / (1000 * 60))}m`;
  } else if (timeDifferenceMs < 86400000) {
    // Less than 24 hours
    return `${Math.floor(timeDifferenceMs / (1000 * 60 * 60))}h`;
  } else if (timeDifferenceMs < 604800000) {
    // Less than 7 days
    return `${Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24))}d`;
  } else {
    return `${Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24 * 7))}w`;
  }
};

export const getExactDate = (updatedAt) => {
  const updatedDate = new Date(updatedAt);
  const currentDate = new Date();

  const timeDifferenceMs = currentDate - updatedDate;

  if (timeDifferenceMs < 86400000) {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return updatedDate.toLocaleString("en-US", options);
  } else if (timeDifferenceMs < 604800000) {
    const options = { weekday: "short" };
    return updatedDate.toLocaleString("en-US", options);
  } else {
    const options = { month: "2-digit", day: "2-digit", year: "numeric" };
    return updatedDate.toLocaleString("en-US", options);
  }
};
