export interface Friends {
  _id: string | unknown;
  username: string;
  email: string;
  unreadCount: number;
  fullname: string;
  chatId: string;
}

export interface GetFriendsResponse {
  friends: Friends[];
}

export interface GetAllRequests {
  message: string;
  requests: FriendRequest[];
}

export interface FriendRequest {
  _id: string;
  from: {
    _id: string;
    fullname: string;
    username: string;
    email: string;
  };
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

export interface AcceptFriendRequest {
  message: string;
}