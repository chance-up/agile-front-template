import axios, { AxiosResponse } from 'axios';
import { UserRawData, UserInfo } from '@/types/UserTypes';
const config = {
  baseURL: 'https://reqres.in/api',
  headers: { Accept: 'application/json' },
};
const api = axios.create(config);

//유저 리스트 불러오기

const getUserList = async (page: string) => {
  // async function getUserList(page: string) {
  // if (fetchedList) {
  //   return Promise.resolve(true);
  // } else {
  return await api
    .get('users?page=' + page)
    .then((response: AxiosResponse<UserRawData>) => {
      console.log(response.data);
      console.log(response.data.data[1].id);
      return response.data;
    })
    .catch(() => {
      return console.log('Get UserList Fail');
    });
  // return await user_api
  //   .get('/users?page=' + page)
  //   .then((response: AxiosResponse<User[]>) => {
  //     console.log(response.data);
  //     return response.data;
  //   })
  //   .catch(() => {
  //     return console.log('Get UserList Fail');
  //   });
};

async function getUser(id: number) {
  return await api
    .get(`/users/${id}`)
    .then((response: AxiosResponse<UserInfo>) => {
      console.log(response.data);
      return response.data;
    })
    .catch(() => {
      return console.log('Get User Fail');
    });
}

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
export { getUserList, getUser };
