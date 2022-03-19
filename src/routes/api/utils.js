export function getRelated (obj = {}) {
  return {
    title: obj.NameOfRelation._text,
    id: getIdFromUrl(obj.URLOfRelation._text)
  }
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

export function getIds (count=10, unavailableIds=[]) {
  const ids = new Array();
  const randomNumber = () => Math.floor(Math.random() * (MAX_NUM_OF_IDS - 1) + 1).toString();
  const getRandomId = () => addZeroes(randomNumber());

  for (let i = 0; i < count; i++) {
    const newId = getRandomId();
    if (isUnavailable(newId, unavailableIds)) {
      i--;
    } else {
      ids.push(newId);
      unavailableIds.push(newId);
    }
  };

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

function isUnavailable (id='000001', unavailableIds=[]) {
  return unavailableIds.includes(unavailableId => unavailableId === id);
}

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