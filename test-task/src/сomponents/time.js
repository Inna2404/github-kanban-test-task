export const timeAgo = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);

  const ms = now.getTime() - createdDate.getTime();
  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);

  if (day > 0) {
    return `${day} day${day > 1 ? "s" : ""} ago`;
  } else if (hour > 0) {
    return `${hour} hour${hour > 1 ? "s" : ""}`;
  } else if (min > 0) {
    return `${min} min${min > 1 ? "s" : ""}`;
  } else {
    return `${sec} sec ago `;
  }
};
