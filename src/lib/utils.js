const max_num_of_ids = 101000;
const id_length = 6;

export function getIds (count=10) {
  const ids = new Array();

  for (let i = 0; i < count; i++) {
    ids.push(Math.floor(Math.random() * (max_num_of_ids - 1) + 1).toString())
  };
    
  ids.forEach((id, i) => {
    ids[i] = addZeroes(id);
  });

  return ids;
}

function addZeroes (id=1) {
  const length = id.toString().length;
  const zeroes = [];

  if (length < id_length) {
    for (let i = 0; i < id_length - length; i++) {
      zeroes.push('0');
    }
  };

  return `${zeroes.join('')}${id}`;
}