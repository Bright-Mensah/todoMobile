class Helper {
  truncateText = (text, maxLength, ellipsis = "...") => {
    if (text.length <= maxLength) {
      return text;
    }

    return text.substring(0, maxLength) + ellipsis;
  };
}
const helper = new Helper();

export default helper;
