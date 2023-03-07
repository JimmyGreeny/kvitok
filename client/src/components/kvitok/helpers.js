import * as uuid from 'uuid';

function newServRow(attrs = {}) {
  const serv_row = {
    price: attrs.price || '',
    count: attrs.count || '',
    id: uuid.v4(),
  };

  return serv_row;
}

function newMaterialRow(attrs = {}) {
  const material_row = {
    price: attrs.price || '',
    count: attrs.count || '',
    id: uuid.v4(),
  };

  return material_row;
}

export default {
  newServRow,
  newMaterialRow
}