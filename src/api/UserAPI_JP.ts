import axios from "axios";
// import { GIT_API_URL } from "@/config/ApiUrlCollections";
import { UserInfo, UserList } from "@/types/UserTypes";

const GIT_API_URL = "https://api.github.com/";

const apiInstance = () => {
  const instance = axios.create({
    baseURL: GIT_API_URL,
    headers: { "content-type": "json-type" },
    // timeout: 10000,
  });
  return instance;
};

const api = apiInstance();

const getUserList = (keyword: string) => {
  console.log(keyword);
  return (
    api
      .get("/search/users", { params: { q: keyword } })
      // .get("/search/users", { params: { q: "leejeong" } })
      .then((response: { data: any }) => {
        console.log(response.data);
        const dataList: UserList[] = response.data.items;
        // return response.data;
        return dataList;
      })
  );
};
const getUserInfo = (keyword: string) => {
  console.log("execute getUserInfo func");
  return (
    api
      .get("/users/" + keyword)
      // .get("/search/users", { params: { q: "leejeong" } })
      .then((response: { data: any }) => {
        console.log(response.data);
        const userInfo: UserInfo = response.data;
        return userInfo;
      })
  );
};

export { apiInstance, getUserList, getUserInfo, api };
