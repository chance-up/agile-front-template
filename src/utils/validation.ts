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
export const checkEnglishNumberKorean = (value: string) => {
  const r = /^[a-zA-Z0-9]*$/;
  console.log(r.test(value));
  console.log(value.length);
  return r.test(String(value));
};

export const validCheck = (validType: number, value: string): [boolean, string] => {
  switch (validType) {
    case VALIDATION_TYPE.SYSTEM_NAME:
      if (checkLength(value, 1, 20) && checkEnglishNumber(value)) {
        return [true, ''];
      } else {
        return [false, '형식에 맞게 입력해주세요.(최대 20자, 영어 대/소문자, 숫자만 사용 가능)'];
      }
    case VALIDATION_TYPE.SYSTEM_ID:
      if (checkLength(value, 1, 20) && checkEnglishNumber(value)) {
        return [true, ''];
      } else {
        return [false, '형식에 맞게 입력해주세요.(최대 20자, 영어 대/소문자, 숫자만 사용 가능)'];
      }
    case VALIDATION_TYPE.SYSTEM_TKCGR_NAME:
      if (checkLength(value, 1, 20) && checkEnglishNumber(value) && checkEnglishNumberKorean(value)) {
        return [true, ''];
      } else {
        return [false, '형식에 맞게 입력해주세요.(최대 20자, 영어 대/소문자, 한글만 사용 가능)'];
      }
    case VALIDATION_TYPE.SYSTEM_TKCGR_POS:
      if (checkLength(value, 1, 20) && checkEnglishNumber(value)) {
        return [true, ''];
      } else {
        return [false, '시스템명 형식에 맞게 입력해주세요.'];
      }
    case VALIDATION_TYPE.SYSTEM_TKCGR_EMAIL:
      if (checkLength(value, 1, 20) && checkEnglishNumber(value) && checkEmail(value)) {
        return [true, ''];
      } else {
        return [false, '시스템명 형식에 맞게 입력해주세요.'];
      }
    default:
      return [true, ''];
  }
};
