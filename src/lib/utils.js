import { browser } from "$app/env";

export function getRelated (relation) {
  let relatedPosts = [];
  
  if (relation && relation.length) {
    relation.forEach(post => {
      relatedPosts.push({
        title: post.NameOfRelation._text,
        url: getIdFromUrl(post.URLOfRelation._text),
        external: checkRelatedUrl(post.URLOfRelation._text)
      })
    })
  } else if (relation) {
    relatedPosts.push({
      title: relation.NameOfRelation._text || "",
      url: getIdFromUrl(relation.URLOfRelation._text) || "",
      external: checkRelatedUrl(relation.URLOfRelation._text) || false
    })
  }
  
  return relatedPosts;  

};

export function getPictureUrl (filename = "", url = "") {
  return `${url}/${filename}`
};

export function getLargePictureUrl (path = "") {
  return path.replace(/\.jpg$/, '_nagykep.jpg');
};

export function getDescription (obj = {}, param = { truncated: false}) {
  if (obj.description) {
    const keys = Object.keys(obj.description);
    const description = keys.map(key => {
      return obj.description[key]._text
    })
      .join(" ")
      .replace(/\n/g, "<br>");

    const descWithAnchorTag = getUrlFromDescription(description);  
    const truncated = truncateDesc(descWithAnchorTag);  
    
    return param.truncated ?
      truncated
      :
      descWithAnchorTag;
  } else {
    return "";
  }

};

function getUrlFromDescription (str = "") {

  let text = str;
  const regex = /\bhttps?:\/\/[^\r\n\t\f\v \)]+/;
  const containsUrl = regex.test(str);  
  let url;
  if (containsUrl) {
    url = str.match(regex)[0] 
    const anchorTag = createAnchorTag(url)
    text = (str.replace(regex, anchorTag));
  }

  return text;
  
}

function createAnchorTag (url = "") {
  return `<a href="${url}" target="_blank">${url}</a>`
}


export function getOriginals (obj = {}) {
  let originals = null;
  
  if (obj !== null) {
    const keys = Object.keys(obj);
    originals = [];
    //get fields if field name is defined, else warn in console
    const fields = keys.reduce((prev, key) => {
      if (ORIGINAL_FIELDS.hasOwnProperty(key)) {
        prev.push(getOriginalFieldValue(obj, key))
      } else {
        console.warn(`WARNING! \n undefined original field: \n '${key}'`)
      }
      return prev
    }, []);

    originals = fields;
  }
  return originals;
}

function getOriginalFieldValue (obj = {}, key = '') {
  if (obj.hasOwnProperty(key) && ORIGINAL_FIELDS.hasOwnProperty(key)) {
    const field = {
      title: ORIGINAL_FIELDS[key],
      text: obj[key]._text
    };
    return field;
  }
}

export function getKeywords (obj = {}) {
  let keywords = null;
  const subjects = obj.subject;

  if (subjects && subjects.length) {
    keywords = subjects.map(subject => subject.Keyword._text);
  } else if (subjects && !subjects.length) {
    keywords = subjects.Keyword._text;
  }

  return keywords;
}

export function encodeURIforDKA (str = "") {
  const encoded = str
    .replace(/á/g, "%E1")
    .replace(/é/g, "%e9")
    .replace(/í/g, "%ed")
    .replace(/ó/g, "%f3")
    .replace(/ö/g, "%f6")
    .replace(/ő/g, "%F5")
    .replace(/ú/g, "%fa")
    .replace(/ü/g, "%fc")
    .replace(/ű/g, "%fb")
    .replace(/\s/g, "_");
  
  return encoded;
}

const ORIGINAL_FIELDS = {
  OriginalTitle: "Cím",
  OriginalAttendance: "Megjelenés",
  OriginalType: "Formátum",
  Technology: "Technológia",
  Location: "Helyszín",
  OriginalCreator: "Szerző",
  OriginalISBN: "ISBN"
}

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
export function truncateDesc (str="") {
  if (str.length < CHAR_LIMIT) {
    return str;
  }
  const cutoff = str.split("").findIndex((e,i)=> /\s/.test(e) && i > CHAR_LIMIT);
	return str.split("").slice(0, cutoff).join("") + "...";
};

export function getIdFromUrl (str = "") {
  const url = str.replace(/\s/g, ""); //remove whitespace
  const id = url.replace(/.*(\/|id=)(\d+)$/, "$2");
  return id;
};

function checkRelatedUrl (str="") {
  const isExternal = !/.*dka\.oszk/.test(str);
  return isExternal;
}

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

export function updateHistory(pathname) {
  if (browser && isPathToStore(pathname)) {
    const previousPath = JSON.stringify(pathname);
    sessionStorage.setItem('prevPath', previousPath);      
  }
}

export function getPreviousFeedPath () {
  const previousPath = JSON.parse(sessionStorage.getItem('prevPath'));
  return previousPath;
}

const isPathToStore = (pathname) => {
  const regex = /^\/$|topic|saved/;
  return regex.test(pathname);
}