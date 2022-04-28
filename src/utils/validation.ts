export const emailCheck = (email: string) => {
  const r =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return r.test(String(email));
};

export const lengthCheck = (value: string, min: number, max: number) => {
  console.log(value.length >= min && value.length <= max);
  console.log(value.length);
  return value.length >= min && value.length <= max;
};

export const englishAndNumberCheck = (value: string) => {
  const r = /[a-zA-Z0-9]/g;
  console.log(r.test(value));
  console.log(value.length);
  return r.test(String(value));
};
