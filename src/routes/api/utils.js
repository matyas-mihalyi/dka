export function getPictureUrl (filename = "", url = "") {
  return `${url}/${filename}`
};

export function getDescription (obj = {}, param = { truncated: false}) {
  if (obj.description) {
    const keys = Object.keys(obj.description);
    const description = keys.map(key => {
      return obj.description[key]._text
    })
      .join("<br>");
    const truncated = truncateDesc(description);  
    
    return param.truncated ?
      truncated
      :
      description;
  } else {
    return "";
  }
};

const CHAR_LIMIT = 140; 
function truncateDesc (str="") {
  if (str.length < CHAR_LIMIT) {
    return str;
  }
  const original = str.split("");
  const truncated = original.slice(0, CHAR_LIMIT)
  .join("");
  return truncated + "...";
}