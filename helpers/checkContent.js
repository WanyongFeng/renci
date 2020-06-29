const isRecord = function (string) {
  return (
    string.charAt(0) === "[" &&
    string.includes("]") &&
    string.charAt(string.length - 1) !== "]" &&
    !string.includes(" min")
  );
};

exports.isRecord = isRecord;
