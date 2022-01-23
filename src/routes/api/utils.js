export function getPictureUrl (filename = "", url = "") {
  return `${url}/${filename}`
};

export function getDescription (obj = {}) {
  if (obj.description) {
    const keys = Object.keys(obj.description);
    const description = keys.map(key => {
      return obj.description[key]._text
    });
    return description.join("\n");
  } else {
    return "";
  }
};
