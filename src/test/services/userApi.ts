// import axios from "axios";
// import { User } from "@/test/Interfaces/Users";
// const config = {
//   baseURL: "https://reqres.in/api",
//   headers: { Accept: "application/json" },
// };
// const user_api = axios.create(config);
// const fetchedList = false;
// const list: Array<User> = [];
// //유저 리스트 불러오기
// const async getUserList (params:type) => {
    
// }

//   async const  getUserList = (page: string) => {
//     if (fetchedList) {
//       return Promise.resolve(true)
//     } else {
//       return await user_api
//         .get("/users?page=" + page)
//         .then(response => {
//             console.log(response.data);
//             const dataList: list[] = response.data.data;
//           return dataList
//         })
//         .catch(() => {
//           return console.log("Get UserList Fail");
//         })
//     }
//   };
//   async const getUser = (id: number) => {
//       return await user_api
//         .get(`/users/${id}`)
//         .then(response => {
//           const user : User = response.data
//           return user
//         })
//         .catch(() => {
//           return console.log(“Get User Fail”);
//         })
//     };
//   //게시글 편집
//     async const editUser = (data: User) => {
//     return await user_api
//       .put(`/users/${data.id}`, {
//         data
//       })
//       .then(() => {
//         const editedUser : User = data
//         return editedUser
//       })
//       .catch(() => {
//         return console.log(“Edit Fail”);
//       })
//   };
//   //게시글 생성
//     async const createPost = (data: User) => {
//     return await user_api
//       .post(‘/users’, {
//         data
//       })
//       .then(response => {
//         const createdUser : User = response.data.data;
//           return createdUser
//       })
//       .catch(() => {
//         return false
//       })
//   };
//   //게시글 삭제
//   async const deletePost = (id: number) => {
//     return user_api
//       .delete(`/users/${id}`)
//       .then(() => {
//         return id;
//       })
//       .catch(() => {
//         console.log(‘Delete fail’)
//       })
//   };
export {};
