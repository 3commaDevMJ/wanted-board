// 암호 체크.
export const checkPw = (onePw: string, curPw: string) => {
  if (onePw === curPw) return true;

  return false;
};
