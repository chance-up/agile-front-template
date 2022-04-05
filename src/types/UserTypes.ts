interface UserList {
  login: string;
  avatar_url: string;
}

interface UserInfo {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}
interface UserRawData {
  data: UserInfo[];
  page: number;
}

export { UserList, UserInfo, UserRawData };
