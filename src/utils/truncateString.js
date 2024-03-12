const truncateString = (charLimit, str, addedChars = "") => {
  if (str.length < charLimit) return str;
  return str.substring(0, charLimit) + addedChars;
};

export default truncateString;
