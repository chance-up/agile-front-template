export const checkEmail = (email: string) => {
  const r =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return r.test(String(email));
};

export const checkLength = (value: string, min: number, max: number) => {
  console.log(value.length >= min && value.length <= max);
  console.log(value.length);
  return value.length >= min && value.length <= max;
};

export const checkEnglishNumber = (value: string) => {
  const r = /^[a-zA-Z0-9]*$/;
  console.log(r.test(value));
  console.log(value.length);
  return r.test(String(value));
};
export const checkEnglishKorean = (value: string) => {
  const r = /^[A-Za-zㄱ-ㅎ가-힣]+$/;
  console.log(r.test(value));
  console.log(value.length);
  return r.test(String(value));
};
export const checkEnglishNumberKorean = (value: string) => {
  const r = /^[a-zA-Z0-9가-힣]*$/;
  return r.test(String(value));
};
