// 암호 체크.
export const checkPw = (onePw: string, curPw: string) => {
    console.log(onePw);
    console.log(curPw);
  if (onePw === curPw) return true;

  return false;
};
