export function getRelated (relation = {}) {
  let relatedPosts = [];
  
  if (relation && relation.length) {
    relation.forEach(post => {
      relatedPosts.push({
        title: post.NameOfRelation._text,
        id: getIdFromUrl(post.URLOfRelation._text)
      })
    })
  } else {
    relatedPosts.push({
      title: relation.NameOfRelation._text || "",
      id: getIdFromUrl(relation.URLOfRelation._text) || ""
    })
  }
  
  return relatedPosts  

};

export function getPictureUrl (filename = "", url = "") {
  return `${url}/${filename}`
};

export function getDescription (obj = {}, param = { truncated: false}) {
  if (obj.description) {
    const keys = Object.keys(obj.description);
    const description = keys.map(key => {
      return obj.description[key]._text
    })
      .join("")
      .replace(/\n/g, "<br>");

    const truncated = truncateDesc(description);  
    
    return param.truncated ?
      truncated
      :
      description;
  } else {
    return "";
  }
};

const MAX_NUM_OF_IDS = 101000;
const ID_LENGTH = 6;
export function getIds (count=10) {
  const ids = new Array();
  for (let i = 0; i < count; i++) {
    ids.push(Math.floor(Math.random() * (MAX_NUM_OF_IDS - 1) + 1).toString())
  };
  ids.forEach((id, i) => {
    ids[i] = addZeroes(id);
  });
  return ids;
};

function addZeroes (id=1) {
  const length = id.toString().length;
  const zeroes = [];
  if (length < ID_LENGTH) {
    for (let i = 0; i < ID_LENGTH - length; i++) {
      zeroes.push('0');
    }
  };
  return `${zeroes.join('')}${id}`;
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
};

function getIdFromUrl (str = "") {
  const id = str.replace(/.*\/(\d+)$/, "$1");
  return id;
};

export function getCookie(cookie, name)
{
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(cookie);
  return (value != null) ? unescape(value[1]) : null;
}

export const isSaved = (savedIds=[], id="") => {
  if (savedIds && savedIds.length) {
    return savedIds.includes(id);
  }
  return false
}