interface UserList {
  login: string;
  avatar_url: string;
}

interface UserInfo {
  login: string;
  avatar_url: string;
  html_url: string;
  blog: string;
  public_repos: number;
  bio: string;
}
interface UserRawData {
  data: UserInfo[];
  page: number;
  per_page: number;
  support: Object;
  total: number;
  total_page: number;
}

export { UserList, UserInfo, UserRawData };
