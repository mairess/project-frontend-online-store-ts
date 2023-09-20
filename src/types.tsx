export type TypeProduct = {
  id: string,
  title: string,
  thumbnail: string,
  price: number,
};

export type CategoryType = {
  id: string,
  name: string,
  selected: boolean,
};

export type TypeProduct2 = {
  id: string,
  title: string,
  price: number,
  thumbnail: string,
  attributes: Attribute[],
};

type Attribute = {
  id: string,
  name: string,
  value_id: string,
  value_name: string,
};
