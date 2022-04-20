import axios, { AxiosResponse } from 'axios';
//import { UserRawData, UserInfo } from '@/types/UserTypes';
import { ApiResponse } from '@/api/ApiResponse';
import { GateWayResponse } from '@/types/GateWayResponse';
import { ParameterError } from '@/error/Errors';
const config = {
  baseURL: 'https://reqres.in/api',
  headers: { Accept: 'application/json' },
};
const api = axios.create(config);

//유저 리스트 불러오기

// const getUserList = async (page: string) => {
//   return await api
//     .get('users?page=' + page)
//     .then((response: AxiosResponse<UserRawData>) => {
//       console.log(response.data);
//       return response.data;
//     })
//     .catch(() => {
//       return console.log('Get UserList Fail');
//     });
// };

// const test = async (page: string) => {
//   try {
//     const response = await ApiResponse.getInstance().get<GateWayResponse<UserRawData>>(
//       'users?page=' + page
//     );
//     throw new ParameterError();
//     return response;
//   } catch (error) {
//     if (error as ParameterError) {
//       throw new ParameterError();
//     } else {
//       throw error;
//     }
//   }
// };

// async function getUser(id: number) {
//   return await api
//     .get(`/users/${id}`)
//     .then((response: AxiosResponse<UserInfo>) => {
//       console.log(response.data);
//       return response.data;
//     })
//     .catch(() => {
//       return console.log('Get User Fail');
//     });
// }

// //게시글 편집
// async function editUser(data: User) {
//   return await user_api
//     .put(`/users/${data.id}`, {
//       data,
//     })
//     .then(() => {
//       const editedUser: User = data;
//       return editedUser;
//     })
//     .catch(() => {
//       return console.log('Edit Fail');
//     });
// }

// //게시글 생성
// async function createUser(data: User) {
//   return await user_api
//     .post('/users', {
//       data,
//     })
//     .then((response: AxiosResponse<User>) => {
//       return response.data;
//     })
//     .catch(() => {
//       return false;
//     });
// }

// //게시글 삭제
// async function deleteUser(id: number) {
//   return user_api
//     .delete(`/users/${id}`)
//     .then(() => {
//       return id;
//     })
//     .catch(() => {
//       console.log('Delete fail');
//     });
// }
// export { getUserList, getUser, test };
