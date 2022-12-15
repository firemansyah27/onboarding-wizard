interface Adress {
  address: string;
  district: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

type TupleUnion<U extends string, R extends string[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U] &
  string[];

type keysType = TupleUnion<keyof Adress>;

export const concatAdressValue = (keys: keysType, obj: Adress): string => {
  let result = "";
  keys.forEach((x) => {
    result += obj[x];
  });
  return result;
};
