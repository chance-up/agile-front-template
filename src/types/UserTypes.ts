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

export { UserList, UserInfo };
