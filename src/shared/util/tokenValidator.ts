// import { jwtDecode } from 'jwt-decode';

// interface JwtPayload {
//   iss: string;
//   sub: string;
//   exp: number;
//   iat: number;
// }

export const isTokenValid = (token: string | null): boolean => {
  console.log(token);
  return true;
  // if (!token) return false;
  //
  // try {
  //   const decoded = jwtDecode<JwtPayload>(token);
  //   const now = Date.now() / 1000;
  //   return decoded.exp > now;
  // } catch {
  //   return false;
  // }
};
