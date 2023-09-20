export const getInitials = (imgName) => {
  const isSingleWord = imgName.split(" ").length === 1;

  if (isSingleWord) {
    return imgName[0];
  }
  return (imgName = imgName.split(" ")[0][0] + imgName.split(" ")[1][0]);
};
