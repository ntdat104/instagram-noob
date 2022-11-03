import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AvatarMutationResponse = {
  __typename?: 'AvatarMutationResponse';
  avatar?: Maybe<Scalars['String']>;
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type BaseResponse = {
  __typename?: 'BaseResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID'];
  caption: Scalars['String'];
  createdAt: Scalars['DateTime'];
  postId: Scalars['String'];
  reactions: Array<User>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type CommentMutationResponse = {
  __typename?: 'CommentMutationResponse';
  code: Scalars['Float'];
  comment?: Maybe<Comment>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Conversation = {
  __typename?: 'Conversation';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  creators: Array<User>;
  lastMessage?: Maybe<Message>;
  members: Array<User>;
};

export type ConversationMutationResponse = {
  __typename?: 'ConversationMutationResponse';
  code: Scalars['Float'];
  conversation?: Maybe<Conversation>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CreateMessageInput = {
  text: Scalars['String'];
};

export type CreatePostInput = {
  base64Photo: Scalars['String'];
  caption: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export enum FollowType {
  Follow = 'FOLLOW',
  Unfollow = 'UNFOLLOW',
}

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  linkReset?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type GetConversationByIdResponse = {
  __typename?: 'GetConversationByIdResponse';
  code: Scalars['Float'];
  conversation?: Maybe<Conversation>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type GetProfileResponse = {
  __typename?: 'GetProfileResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  postCounts?: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type GetSessionResponse = {
  __typename?: 'GetSessionResponse';
  accessToken?: Maybe<Scalars['String']>;
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type GetSuggestionsResponse = {
  __typename?: 'GetSuggestionsResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  nextPage?: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
  users?: Maybe<Array<User>>;
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID'];
  conversationId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  seen: Scalars['Boolean'];
  text: Scalars['String'];
  user: User;
};

export type MessageMutationResponse = {
  __typename?: 'MessageMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  newMessage?: Maybe<Message>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAvatar: AvatarMutationResponse;
  changePassword: BaseResponse;
  createComment: CommentMutationResponse;
  createConversation: ConversationMutationResponse;
  createMessage: MessageMutationResponse;
  createPost: PostMutationResponse;
  deleteChat: BaseResponse;
  deleteComment: BaseResponse;
  deleteMessage: BaseResponse;
  deletePost: BaseResponse;
  followUser: UserMutationResponse;
  forgotPassword: ForgotPasswordResponse;
  login: UserMutationResponse;
  loginFacebook: UserMutationResponse;
  loginGoogle: UserMutationResponse;
  logout: BaseResponse;
  reactComment: BaseResponse;
  reactPost: BaseResponse;
  readMessage: BaseResponse;
  register: UserMutationResponse;
  updateAvatar: AvatarMutationResponse;
  updatePost: PostMutationResponse;
};

export type MutationAddAvatarArgs = {
  base64Photo: Scalars['String'];
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
  userId: Scalars['String'];
};

export type MutationCreateCommentArgs = {
  caption: Scalars['String'];
  postId: Scalars['String'];
};

export type MutationCreateConversationArgs = {
  receiverId: Scalars['String'];
};

export type MutationCreateMessageArgs = {
  conversationId: Scalars['ID'];
  createMessageInput: CreateMessageInput;
};

export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};

export type MutationDeleteChatArgs = {
  conversationId: Scalars['String'];
};

export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
};

export type MutationDeleteMessageArgs = {
  messageId: Scalars['ID'];
};

export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};

export type MutationFollowUserArgs = {
  followType: FollowType;
  userId: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  usernameOrEmail: Scalars['String'];
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationLoginFacebookArgs = {
  accessToken: Scalars['String'];
  userId: Scalars['String'];
};

export type MutationLoginGoogleArgs = {
  clientId: Scalars['String'];
  tokenId: Scalars['String'];
};

export type MutationReactCommentArgs = {
  commentId: Scalars['String'];
  reaction: ReactionType;
};

export type MutationReactPostArgs = {
  postId: Scalars['String'];
  reaction: ReactionType;
};

export type MutationReadMessageArgs = {
  messageId: Scalars['ID'];
};

export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};

export type MutationUpdateAvatarArgs = {
  base64Photo: Scalars['String'];
  oldPhotoUrl: Scalars['String'];
};

export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};

export type PaginatedCommentsResponse = {
  __typename?: 'PaginatedCommentsResponse';
  code: Scalars['Float'];
  comments?: Maybe<Array<Comment>>;
  cursor?: Maybe<Scalars['String']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type PaginatedConversationsResponse = {
  __typename?: 'PaginatedConversationsResponse';
  code: Scalars['Float'];
  conversations?: Maybe<Array<Conversation>>;
  cursor?: Maybe<Scalars['String']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type PaginatedMessagesResponse = {
  __typename?: 'PaginatedMessagesResponse';
  code: Scalars['Float'];
  cursor?: Maybe<Scalars['String']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  messages?: Maybe<Array<Message>>;
  success: Scalars['Boolean'];
};

export type PaginatedPostsResponse = {
  __typename?: 'PaginatedPostsResponse';
  code: Scalars['Float'];
  cursor?: Maybe<Scalars['String']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  success: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  commentCounts: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  photo?: Maybe<Scalars['String']>;
  reactions: Array<User>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type PostMutationResponse = {
  __typename?: 'PostMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  getComments: PaginatedCommentsResponse;
  getConversationById: GetConversationByIdResponse;
  getConversations: PaginatedConversationsResponse;
  getMessages: PaginatedMessagesResponse;
  getPosts: PaginatedPostsResponse;
  getProfile: GetProfileResponse;
  getSession: GetSessionResponse;
  getSuggestions: GetSuggestionsResponse;
  searchUser: SearchUserResponse;
};

export type QueryGetCommentsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  postId: Scalars['ID'];
};

export type QueryGetConversationByIdArgs = {
  conversationId: Scalars['String'];
};

export type QueryGetConversationsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type QueryGetMessagesArgs = {
  conversationId: Scalars['ID'];
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type QueryGetPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  query?: InputMaybe<QueryPostsInput>;
};

export type QueryGetProfileArgs = {
  username: Scalars['String'];
};

export type QueryGetSuggestionsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type QuerySearchUserArgs = {
  limit: Scalars['Int'];
  query: Scalars['String'];
};

export type QueryPostsInput = {
  field: Scalars['String'];
  value: Scalars['String'];
};

export enum ReactionType {
  Like = 'LIKE',
  Unlike = 'UNLIKE',
}

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SearchUserResponse = {
  __typename?: 'SearchUserResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  users?: Maybe<Array<User>>;
};

export type UpdatePostInput = {
  caption?: InputMaybe<Scalars['String']>;
  newBase64Photo?: InputMaybe<Scalars['String']>;
  oldPhotoUrl?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  account: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  followers: Array<User>;
  following: Array<User>;
  password?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserMutationResponse = {
  __typename?: 'UserMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type CommentFragment = {
  __typename?: 'Comment';
  _id: string;
  caption: string;
  postId: string;
  createdAt: any;
  updatedAt: any;
  reactions: Array<{
    __typename?: 'User';
    _id: string;
    email: string;
    username: string;
    account: string;
    avatar?: string | null;
  }>;
  user: {
    __typename?: 'User';
    _id: string;
    email: string;
    username: string;
    account: string;
    avatar?: string | null;
  };
};

export type ConversationFragment = {
  __typename?: 'Conversation';
  _id: string;
  createdAt: any;
  creators: Array<{
    __typename?: 'User';
    _id: string;
    email: string;
    username: string;
    account: string;
    avatar?: string | null;
  }>;
  members: Array<{
    __typename?: 'User';
    _id: string;
    email: string;
    username: string;
    account: string;
    avatar?: string | null;
  }>;
  lastMessage?: {
    __typename?: 'Message';
    _id: string;
    text: string;
    createdAt: any;
    seen: boolean;
    user: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    };
  } | null;
};

export type FieldErrorFragment = { __typename?: 'FieldError'; field: string; message: string };

export type MessageFragment = {
  __typename?: 'Message';
  _id: string;
  conversationId: string;
  text: string;
  createdAt: any;
  seen: boolean;
  user: {
    __typename?: 'User';
    _id: string;
    email: string;
    username: string;
    account: string;
    avatar?: string | null;
  };
};

export type PostFragment = {
  __typename?: 'Post';
  _id: string;
  caption?: string | null;
  photo?: string | null;
  commentCounts: number;
  createdAt: any;
  updatedAt: any;
  reactions: Array<{
    __typename?: 'User';
    _id: string;
    email: string;
    username: string;
    account: string;
    avatar?: string | null;
  }>;
  user: {
    __typename?: 'User';
    _id: string;
    email: string;
    username: string;
    account: string;
    avatar?: string | null;
    followers: Array<{
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    }>;
    following: Array<{
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    }>;
  };
};

export type PostMutationResponseFragment = {
  __typename?: 'PostMutationResponse';
  code: number;
  success: boolean;
  message?: string | null;
  post?: {
    __typename?: 'Post';
    _id: string;
    caption?: string | null;
    photo?: string | null;
    commentCounts: number;
    createdAt: any;
    updatedAt: any;
    reactions: Array<{
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    }>;
    user: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
      followers: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      following: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
    };
  } | null;
};

export type BaseUserFragment = {
  __typename?: 'User';
  _id: string;
  email: string;
  username: string;
  account: string;
  avatar?: string | null;
};

export type UserFragment = {
  __typename?: 'User';
  _id: string;
  email: string;
  username: string;
  account: string;
  avatar?: string | null;
  followers: Array<{
    __typename?: 'User';
    _id: string;
    email: string;
    username: string;
    account: string;
    avatar?: string | null;
  }>;
  following: Array<{
    __typename?: 'User';
    _id: string;
    email: string;
    username: string;
    account: string;
    avatar?: string | null;
  }>;
};

export type UserMutationResponseFragment = {
  __typename?: 'UserMutationResponse';
  code: number;
  success: boolean;
  message?: string | null;
  user?: {
    __typename?: 'User';
    _id: string;
    email: string;
    username: string;
    account: string;
    avatar?: string | null;
    followers: Array<{
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    }>;
    following: Array<{
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    }>;
  } | null;
  errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
};

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  userId: Scalars['String'];
  token: Scalars['String'];
}>;

export type ChangePasswordMutation = {
  __typename?: 'Mutation';
  changePassword: {
    __typename?: 'BaseResponse';
    code: number;
    success: boolean;
    message?: string | null;
  };
};

export type ForgotPasswordMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
}>;

export type ForgotPasswordMutation = {
  __typename?: 'Mutation';
  forgotPassword: {
    __typename?: 'ForgotPasswordResponse';
    code: number;
    success: boolean;
    message?: string | null;
    linkReset?: string | null;
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
  };
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    user?: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
      followers: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      following: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
    } | null;
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
  };
};

export type LoginFacebookMutationVariables = Exact<{
  userId: Scalars['String'];
  accessToken: Scalars['String'];
}>;

export type LoginFacebookMutation = {
  __typename?: 'Mutation';
  loginFacebook: {
    __typename?: 'UserMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    user?: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
      followers: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      following: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
    } | null;
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
  };
};

export type LoginGoogleMutationVariables = Exact<{
  clientId: Scalars['String'];
  tokenId: Scalars['String'];
}>;

export type LoginGoogleMutation = {
  __typename?: 'Mutation';
  loginGoogle: {
    __typename?: 'UserMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    user?: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
      followers: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      following: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
    } | null;
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename?: 'Mutation';
  logout: { __typename?: 'BaseResponse'; code: number; success: boolean };
};

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'UserMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    user?: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
      followers: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      following: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
    } | null;
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
  };
};

export type CreateCommentMutationVariables = Exact<{
  caption: Scalars['String'];
  postId: Scalars['String'];
}>;

export type CreateCommentMutation = {
  __typename?: 'Mutation';
  createComment: {
    __typename?: 'CommentMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    comment?: {
      __typename?: 'Comment';
      _id: string;
      caption: string;
      postId: string;
      createdAt: any;
      updatedAt: any;
      reactions: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      user: {
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      };
    } | null;
  };
};

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
}>;

export type DeleteCommentMutation = {
  __typename?: 'Mutation';
  deleteComment: {
    __typename?: 'BaseResponse';
    code: number;
    success: boolean;
    message?: string | null;
  };
};

export type ReactCommentMutationVariables = Exact<{
  reaction: ReactionType;
  commentId: Scalars['String'];
}>;

export type ReactCommentMutation = {
  __typename?: 'Mutation';
  reactComment: {
    __typename?: 'BaseResponse';
    code: number;
    success: boolean;
    message?: string | null;
  };
};

export type CreateConversationMutationVariables = Exact<{
  receiverId: Scalars['String'];
}>;

export type CreateConversationMutation = {
  __typename?: 'Mutation';
  createConversation: {
    __typename?: 'ConversationMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    conversation?: {
      __typename?: 'Conversation';
      _id: string;
      createdAt: any;
      creators: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      members: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      lastMessage?: {
        __typename?: 'Message';
        _id: string;
        text: string;
        createdAt: any;
        seen: boolean;
        user: {
          __typename?: 'User';
          _id: string;
          email: string;
          username: string;
          account: string;
          avatar?: string | null;
        };
      } | null;
    } | null;
  };
};

export type DeleteChatMutationVariables = Exact<{
  conversationId: Scalars['String'];
}>;

export type DeleteChatMutation = {
  __typename?: 'Mutation';
  deleteChat: {
    __typename?: 'BaseResponse';
    code: number;
    success: boolean;
    message?: string | null;
  };
};

export type CreateMessageMutationVariables = Exact<{
  createMessageInput: CreateMessageInput;
  conversationId: Scalars['ID'];
}>;

export type CreateMessageMutation = {
  __typename?: 'Mutation';
  createMessage: {
    __typename?: 'MessageMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    newMessage?: {
      __typename?: 'Message';
      _id: string;
      conversationId: string;
      text: string;
      createdAt: any;
      seen: boolean;
      user: {
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      };
    } | null;
  };
};

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['ID'];
}>;

export type DeleteMessageMutation = {
  __typename?: 'Mutation';
  deleteMessage: {
    __typename?: 'BaseResponse';
    code: number;
    success: boolean;
    message?: string | null;
  };
};

export type ReadMessageMutationVariables = Exact<{
  messageId: Scalars['ID'];
}>;

export type ReadMessageMutation = {
  __typename?: 'Mutation';
  readMessage: {
    __typename?: 'BaseResponse';
    success: boolean;
    code: number;
    message?: string | null;
  };
};

export type CreatePostMutationVariables = Exact<{
  createPostInput: CreatePostInput;
}>;

export type CreatePostMutation = {
  __typename?: 'Mutation';
  createPost: {
    __typename?: 'PostMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    post?: {
      __typename?: 'Post';
      _id: string;
      caption?: string | null;
      photo?: string | null;
      commentCounts: number;
      createdAt: any;
      updatedAt: any;
      reactions: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      user: {
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
        followers: Array<{
          __typename?: 'User';
          _id: string;
          email: string;
          username: string;
          account: string;
          avatar?: string | null;
        }>;
        following: Array<{
          __typename?: 'User';
          _id: string;
          email: string;
          username: string;
          account: string;
          avatar?: string | null;
        }>;
      };
    } | null;
  };
};

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;

export type DeletePostMutation = {
  __typename?: 'Mutation';
  deletePost: {
    __typename?: 'BaseResponse';
    code: number;
    success: boolean;
    message?: string | null;
  };
};

export type ReactPostMutationVariables = Exact<{
  reaction: ReactionType;
  postId: Scalars['String'];
}>;

export type ReactPostMutation = {
  __typename?: 'Mutation';
  reactPost: {
    __typename?: 'BaseResponse';
    code: number;
    success: boolean;
    message?: string | null;
  };
};

export type UpdatePostMutationVariables = Exact<{
  updatePostInput: UpdatePostInput;
}>;

export type UpdatePostMutation = {
  __typename?: 'Mutation';
  updatePost: {
    __typename?: 'PostMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    post?: {
      __typename?: 'Post';
      _id: string;
      caption?: string | null;
      photo?: string | null;
      commentCounts: number;
      createdAt: any;
      updatedAt: any;
      reactions: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      user: {
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
        followers: Array<{
          __typename?: 'User';
          _id: string;
          email: string;
          username: string;
          account: string;
          avatar?: string | null;
        }>;
        following: Array<{
          __typename?: 'User';
          _id: string;
          email: string;
          username: string;
          account: string;
          avatar?: string | null;
        }>;
      };
    } | null;
  };
};

export type AddAvatarMutationVariables = Exact<{
  base64Photo: Scalars['String'];
}>;

export type AddAvatarMutation = {
  __typename?: 'Mutation';
  addAvatar: {
    __typename?: 'AvatarMutationResponse';
    code: number;
    success: boolean;
    avatar?: string | null;
  };
};

export type FollowUserMutationVariables = Exact<{
  followType: FollowType;
  userId: Scalars['String'];
}>;

export type FollowUserMutation = {
  __typename?: 'Mutation';
  followUser: {
    __typename?: 'UserMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    user?: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
      followers: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      following: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
    } | null;
  };
};

export type UpdateAvatarMutationVariables = Exact<{
  oldPhotoUrl: Scalars['String'];
  base64Photo: Scalars['String'];
}>;

export type UpdateAvatarMutation = {
  __typename?: 'Mutation';
  updateAvatar: {
    __typename?: 'AvatarMutationResponse';
    code: number;
    success: boolean;
    avatar?: string | null;
  };
};

export type GetSessionQueryVariables = Exact<{ [key: string]: never }>;

export type GetSessionQuery = {
  __typename?: 'Query';
  getSession: {
    __typename?: 'GetSessionResponse';
    code: number;
    success: boolean;
    accessToken?: string | null;
    user?: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
      followers: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      following: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
    } | null;
  };
};

export type GetCommentsQueryVariables = Exact<{
  postId: Scalars['ID'];
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;

export type GetCommentsQuery = {
  __typename?: 'Query';
  getComments: {
    __typename?: 'PaginatedCommentsResponse';
    code: number;
    success: boolean;
    message?: string | null;
    cursor?: string | null;
    hasMore?: boolean | null;
    comments?: Array<{
      __typename?: 'Comment';
      _id: string;
      caption: string;
      postId: string;
      createdAt: any;
      updatedAt: any;
      reactions: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      user: {
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      };
    }> | null;
  };
};

export type GetConversationByIdQueryVariables = Exact<{
  conversationId: Scalars['String'];
}>;

export type GetConversationByIdQuery = {
  __typename?: 'Query';
  getConversationById: {
    __typename?: 'GetConversationByIdResponse';
    code: number;
    success: boolean;
    message?: string | null;
    conversation?: {
      __typename?: 'Conversation';
      _id: string;
      createdAt: any;
      creators: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      members: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      lastMessage?: {
        __typename?: 'Message';
        _id: string;
        text: string;
        createdAt: any;
        seen: boolean;
        user: {
          __typename?: 'User';
          _id: string;
          email: string;
          username: string;
          account: string;
          avatar?: string | null;
        };
      } | null;
    } | null;
  };
};

export type GetConversationsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;

export type GetConversationsQuery = {
  __typename?: 'Query';
  getConversations: {
    __typename?: 'PaginatedConversationsResponse';
    code: number;
    success: boolean;
    message?: string | null;
    cursor?: string | null;
    hasMore?: boolean | null;
    conversations?: Array<{
      __typename?: 'Conversation';
      _id: string;
      createdAt: any;
      creators: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      members: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      lastMessage?: {
        __typename?: 'Message';
        _id: string;
        text: string;
        createdAt: any;
        seen: boolean;
        user: {
          __typename?: 'User';
          _id: string;
          email: string;
          username: string;
          account: string;
          avatar?: string | null;
        };
      } | null;
    }> | null;
  };
};

export type GetMessagesQueryVariables = Exact<{
  limit: Scalars['Int'];
  conversationId: Scalars['ID'];
  cursor?: InputMaybe<Scalars['String']>;
}>;

export type GetMessagesQuery = {
  __typename?: 'Query';
  getMessages: {
    __typename?: 'PaginatedMessagesResponse';
    code: number;
    success: boolean;
    cursor?: string | null;
    hasMore?: boolean | null;
    messages?: Array<{
      __typename?: 'Message';
      _id: string;
      conversationId: string;
      text: string;
      createdAt: any;
      seen: boolean;
      user: {
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      };
    }> | null;
  };
};

export type GetPostsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  query?: InputMaybe<QueryPostsInput>;
}>;

export type GetPostsQuery = {
  __typename?: 'Query';
  getPosts: {
    __typename?: 'PaginatedPostsResponse';
    code: number;
    message?: string | null;
    success: boolean;
    cursor?: string | null;
    hasMore?: boolean | null;
    posts?: Array<{
      __typename?: 'Post';
      _id: string;
      caption?: string | null;
      photo?: string | null;
      commentCounts: number;
      createdAt: any;
      updatedAt: any;
      reactions: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      user: {
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
        followers: Array<{
          __typename?: 'User';
          _id: string;
          email: string;
          username: string;
          account: string;
          avatar?: string | null;
        }>;
        following: Array<{
          __typename?: 'User';
          _id: string;
          email: string;
          username: string;
          account: string;
          avatar?: string | null;
        }>;
      };
    }> | null;
  };
};

export type GetProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;

export type GetProfileQuery = {
  __typename?: 'Query';
  getProfile: {
    __typename?: 'GetProfileResponse';
    code: number;
    success: boolean;
    message?: string | null;
    postCounts?: number | null;
    user?: {
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
      followers: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      following: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
    } | null;
  };
};

export type GetSuggestionsQueryVariables = Exact<{
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;

export type GetSuggestionsQuery = {
  __typename?: 'Query';
  getSuggestions: {
    __typename?: 'GetSuggestionsResponse';
    code: number;
    success: boolean;
    nextPage?: number | null;
    users?: Array<{
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
      followers: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
      following: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
      }>;
    }> | null;
  };
};

export type SearchUserQueryVariables = Exact<{
  query: Scalars['String'];
  limit: Scalars['Int'];
}>;

export type SearchUserQuery = {
  __typename?: 'Query';
  searchUser: {
    __typename?: 'SearchUserResponse';
    code: number;
    success: boolean;
    users?: Array<{
      __typename?: 'User';
      _id: string;
      email: string;
      username: string;
      account: string;
      avatar?: string | null;
    }> | null;
  };
};

export const BaseUserFragmentDoc = gql`
  fragment baseUser on User {
    _id
    email
    username
    account
    avatar
  }
`;
export const CommentFragmentDoc = gql`
  fragment comment on Comment {
    _id
    caption
    postId
    reactions {
      _id
      email
      username
      account
      avatar
    }
    user {
      ...baseUser
    }
    createdAt
    updatedAt
  }
  ${BaseUserFragmentDoc}
`;
export const ConversationFragmentDoc = gql`
  fragment conversation on Conversation {
    _id
    creators {
      ...baseUser
    }
    members {
      ...baseUser
    }
    lastMessage {
      _id
      text
      createdAt
      seen
      user {
        ...baseUser
      }
    }
    createdAt
  }
  ${BaseUserFragmentDoc}
`;
export const MessageFragmentDoc = gql`
  fragment message on Message {
    _id
    conversationId
    text
    createdAt
    seen
    user {
      ...baseUser
    }
  }
  ${BaseUserFragmentDoc}
`;
export const UserFragmentDoc = gql`
  fragment user on User {
    ...baseUser
    followers {
      ...baseUser
    }
    following {
      ...baseUser
    }
  }
  ${BaseUserFragmentDoc}
`;
export const PostFragmentDoc = gql`
  fragment post on Post {
    _id
    caption
    photo
    commentCounts
    reactions {
      ...baseUser
    }
    user {
      ...user
    }
    createdAt
    updatedAt
  }
  ${BaseUserFragmentDoc}
  ${UserFragmentDoc}
`;
export const PostMutationResponseFragmentDoc = gql`
  fragment postMutationResponse on PostMutationResponse {
    code
    success
    message
    post {
      ...post
    }
  }
  ${PostFragmentDoc}
`;
export const FieldErrorFragmentDoc = gql`
  fragment fieldError on FieldError {
    field
    message
  }
`;
export const UserMutationResponseFragmentDoc = gql`
  fragment userMutationResponse on UserMutationResponse {
    code
    success
    message
    user {
      ...user
    }
    errors {
      ...fieldError
    }
  }
  ${UserFragmentDoc}
  ${FieldErrorFragmentDoc}
`;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($newPassword: String!, $userId: String!, $token: String!) {
    changePassword(newPassword: $newPassword, userId: $userId, token: $token) {
      code
      success
      message
    }
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      userId: // value for 'userId'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(
    ChangePasswordDocument,
    options,
  );
}
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($usernameOrEmail: String!) {
    forgotPassword(usernameOrEmail: $usernameOrEmail) {
      code
      success
      message
      errors {
        ...fieldError
      }
      linkReset
    }
  }
  ${FieldErrorFragmentDoc}
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument,
    options,
  );
}
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      ...userMutationResponse
    }
  }
  ${UserMutationResponseFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LoginFacebookDocument = gql`
  mutation LoginFacebook($userId: String!, $accessToken: String!) {
    loginFacebook(userId: $userId, accessToken: $accessToken) {
      ...userMutationResponse
    }
  }
  ${UserMutationResponseFragmentDoc}
`;
export type LoginFacebookMutationFn = Apollo.MutationFunction<
  LoginFacebookMutation,
  LoginFacebookMutationVariables
>;

/**
 * __useLoginFacebookMutation__
 *
 * To run a mutation, you first call `useLoginFacebookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginFacebookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginFacebookMutation, { data, loading, error }] = useLoginFacebookMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      accessToken: // value for 'accessToken'
 *   },
 * });
 */
export function useLoginFacebookMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginFacebookMutation, LoginFacebookMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginFacebookMutation, LoginFacebookMutationVariables>(
    LoginFacebookDocument,
    options,
  );
}
export type LoginFacebookMutationHookResult = ReturnType<typeof useLoginFacebookMutation>;
export type LoginFacebookMutationResult = Apollo.MutationResult<LoginFacebookMutation>;
export type LoginFacebookMutationOptions = Apollo.BaseMutationOptions<
  LoginFacebookMutation,
  LoginFacebookMutationVariables
>;
export const LoginGoogleDocument = gql`
  mutation LoginGoogle($clientId: String!, $tokenId: String!) {
    loginGoogle(clientId: $clientId, tokenId: $tokenId) {
      ...userMutationResponse
    }
  }
  ${UserMutationResponseFragmentDoc}
`;
export type LoginGoogleMutationFn = Apollo.MutationFunction<
  LoginGoogleMutation,
  LoginGoogleMutationVariables
>;

/**
 * __useLoginGoogleMutation__
 *
 * To run a mutation, you first call `useLoginGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginGoogleMutation, { data, loading, error }] = useLoginGoogleMutation({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      tokenId: // value for 'tokenId'
 *   },
 * });
 */
export function useLoginGoogleMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginGoogleMutation, LoginGoogleMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginGoogleMutation, LoginGoogleMutationVariables>(
    LoginGoogleDocument,
    options,
  );
}
export type LoginGoogleMutationHookResult = ReturnType<typeof useLoginGoogleMutation>;
export type LoginGoogleMutationResult = Apollo.MutationResult<LoginGoogleMutation>;
export type LoginGoogleMutationOptions = Apollo.BaseMutationOptions<
  LoginGoogleMutation,
  LoginGoogleMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout {
      code
      success
    }
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      ...userMutationResponse
    }
  }
  ${UserMutationResponseFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const CreateCommentDocument = gql`
  mutation CreateComment($caption: String!, $postId: String!) {
    createComment(caption: $caption, postId: $postId) {
      code
      success
      message
      comment {
        ...comment
      }
    }
  }
  ${CommentFragmentDoc}
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      caption: // value for 'caption'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(
    CreateCommentDocument,
    options,
  );
}
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export const DeleteCommentDocument = gql`
  mutation DeleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      code
      success
      message
    }
  }
`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(
    DeleteCommentDocument,
    options,
  );
}
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;
export const ReactCommentDocument = gql`
  mutation ReactComment($reaction: ReactionType!, $commentId: String!) {
    reactComment(reaction: $reaction, commentId: $commentId) {
      code
      success
      message
    }
  }
`;
export type ReactCommentMutationFn = Apollo.MutationFunction<
  ReactCommentMutation,
  ReactCommentMutationVariables
>;

/**
 * __useReactCommentMutation__
 *
 * To run a mutation, you first call `useReactCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactCommentMutation, { data, loading, error }] = useReactCommentMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useReactCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<ReactCommentMutation, ReactCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ReactCommentMutation, ReactCommentMutationVariables>(
    ReactCommentDocument,
    options,
  );
}
export type ReactCommentMutationHookResult = ReturnType<typeof useReactCommentMutation>;
export type ReactCommentMutationResult = Apollo.MutationResult<ReactCommentMutation>;
export type ReactCommentMutationOptions = Apollo.BaseMutationOptions<
  ReactCommentMutation,
  ReactCommentMutationVariables
>;
export const CreateConversationDocument = gql`
  mutation CreateConversation($receiverId: String!) {
    createConversation(receiverId: $receiverId) {
      code
      success
      message
      conversation {
        ...conversation
      }
    }
  }
  ${ConversationFragmentDoc}
`;
export type CreateConversationMutationFn = Apollo.MutationFunction<
  CreateConversationMutation,
  CreateConversationMutationVariables
>;

/**
 * __useCreateConversationMutation__
 *
 * To run a mutation, you first call `useCreateConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConversationMutation, { data, loading, error }] = useCreateConversationMutation({
 *   variables: {
 *      receiverId: // value for 'receiverId'
 *   },
 * });
 */
export function useCreateConversationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateConversationMutation,
    CreateConversationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateConversationMutation, CreateConversationMutationVariables>(
    CreateConversationDocument,
    options,
  );
}
export type CreateConversationMutationHookResult = ReturnType<typeof useCreateConversationMutation>;
export type CreateConversationMutationResult = Apollo.MutationResult<CreateConversationMutation>;
export type CreateConversationMutationOptions = Apollo.BaseMutationOptions<
  CreateConversationMutation,
  CreateConversationMutationVariables
>;
export const DeleteChatDocument = gql`
  mutation DeleteChat($conversationId: String!) {
    deleteChat(conversationId: $conversationId) {
      code
      success
      message
    }
  }
`;
export type DeleteChatMutationFn = Apollo.MutationFunction<
  DeleteChatMutation,
  DeleteChatMutationVariables
>;

/**
 * __useDeleteChatMutation__
 *
 * To run a mutation, you first call `useDeleteChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChatMutation, { data, loading, error }] = useDeleteChatMutation({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useDeleteChatMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteChatMutation, DeleteChatMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteChatMutation, DeleteChatMutationVariables>(
    DeleteChatDocument,
    options,
  );
}
export type DeleteChatMutationHookResult = ReturnType<typeof useDeleteChatMutation>;
export type DeleteChatMutationResult = Apollo.MutationResult<DeleteChatMutation>;
export type DeleteChatMutationOptions = Apollo.BaseMutationOptions<
  DeleteChatMutation,
  DeleteChatMutationVariables
>;
export const CreateMessageDocument = gql`
  mutation CreateMessage($createMessageInput: CreateMessageInput!, $conversationId: ID!) {
    createMessage(createMessageInput: $createMessageInput, conversationId: $conversationId) {
      code
      success
      message
      newMessage {
        ...message
      }
    }
  }
  ${MessageFragmentDoc}
`;
export type CreateMessageMutationFn = Apollo.MutationFunction<
  CreateMessageMutation,
  CreateMessageMutationVariables
>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      createMessageInput: // value for 'createMessageInput'
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useCreateMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(
    CreateMessageDocument,
    options,
  );
}
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<
  CreateMessageMutation,
  CreateMessageMutationVariables
>;
export const DeleteMessageDocument = gql`
  mutation DeleteMessage($messageId: ID!) {
    deleteMessage(messageId: $messageId) {
      code
      success
      message
    }
  }
`;
export type DeleteMessageMutationFn = Apollo.MutationFunction<
  DeleteMessageMutation,
  DeleteMessageMutationVariables
>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(
    DeleteMessageDocument,
    options,
  );
}
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<
  DeleteMessageMutation,
  DeleteMessageMutationVariables
>;
export const ReadMessageDocument = gql`
  mutation ReadMessage($messageId: ID!) {
    readMessage(messageId: $messageId) {
      success
      code
      message
    }
  }
`;
export type ReadMessageMutationFn = Apollo.MutationFunction<
  ReadMessageMutation,
  ReadMessageMutationVariables
>;

/**
 * __useReadMessageMutation__
 *
 * To run a mutation, you first call `useReadMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readMessageMutation, { data, loading, error }] = useReadMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useReadMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<ReadMessageMutation, ReadMessageMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ReadMessageMutation, ReadMessageMutationVariables>(
    ReadMessageDocument,
    options,
  );
}
export type ReadMessageMutationHookResult = ReturnType<typeof useReadMessageMutation>;
export type ReadMessageMutationResult = Apollo.MutationResult<ReadMessageMutation>;
export type ReadMessageMutationOptions = Apollo.BaseMutationOptions<
  ReadMessageMutation,
  ReadMessageMutationVariables
>;
export const CreatePostDocument = gql`
  mutation CreatePost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      ...postMutationResponse
    }
  }
  ${PostMutationResponseFragmentDoc}
`;
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      createPostInput: // value for 'createPostInput'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options,
  );
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>;
export const DeletePostDocument = gql`
  mutation DeletePost($postId: String!) {
    deletePost(postId: $postId) {
      code
      success
      message
    }
  }
`;
export type DeletePostMutationFn = Apollo.MutationFunction<
  DeletePostMutation,
  DeletePostMutationVariables
>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(
  baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument,
    options,
  );
}
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<
  DeletePostMutation,
  DeletePostMutationVariables
>;
export const ReactPostDocument = gql`
  mutation ReactPost($reaction: ReactionType!, $postId: String!) {
    reactPost(reaction: $reaction, postId: $postId) {
      code
      success
      message
    }
  }
`;
export type ReactPostMutationFn = Apollo.MutationFunction<
  ReactPostMutation,
  ReactPostMutationVariables
>;

/**
 * __useReactPostMutation__
 *
 * To run a mutation, you first call `useReactPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactPostMutation, { data, loading, error }] = useReactPostMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useReactPostMutation(
  baseOptions?: Apollo.MutationHookOptions<ReactPostMutation, ReactPostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ReactPostMutation, ReactPostMutationVariables>(
    ReactPostDocument,
    options,
  );
}
export type ReactPostMutationHookResult = ReturnType<typeof useReactPostMutation>;
export type ReactPostMutationResult = Apollo.MutationResult<ReactPostMutation>;
export type ReactPostMutationOptions = Apollo.BaseMutationOptions<
  ReactPostMutation,
  ReactPostMutationVariables
>;
export const UpdatePostDocument = gql`
  mutation UpdatePost($updatePostInput: UpdatePostInput!) {
    updatePost(updatePostInput: $updatePostInput) {
      ...postMutationResponse
    }
  }
  ${PostMutationResponseFragmentDoc}
`;
export type UpdatePostMutationFn = Apollo.MutationFunction<
  UpdatePostMutation,
  UpdatePostMutationVariables
>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      updatePostInput: // value for 'updatePostInput'
 *   },
 * });
 */
export function useUpdatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument,
    options,
  );
}
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<
  UpdatePostMutation,
  UpdatePostMutationVariables
>;
export const AddAvatarDocument = gql`
  mutation AddAvatar($base64Photo: String!) {
    addAvatar(base64Photo: $base64Photo) {
      code
      success
      avatar
    }
  }
`;
export type AddAvatarMutationFn = Apollo.MutationFunction<
  AddAvatarMutation,
  AddAvatarMutationVariables
>;

/**
 * __useAddAvatarMutation__
 *
 * To run a mutation, you first call `useAddAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAvatarMutation, { data, loading, error }] = useAddAvatarMutation({
 *   variables: {
 *      base64Photo: // value for 'base64Photo'
 *   },
 * });
 */
export function useAddAvatarMutation(
  baseOptions?: Apollo.MutationHookOptions<AddAvatarMutation, AddAvatarMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddAvatarMutation, AddAvatarMutationVariables>(
    AddAvatarDocument,
    options,
  );
}
export type AddAvatarMutationHookResult = ReturnType<typeof useAddAvatarMutation>;
export type AddAvatarMutationResult = Apollo.MutationResult<AddAvatarMutation>;
export type AddAvatarMutationOptions = Apollo.BaseMutationOptions<
  AddAvatarMutation,
  AddAvatarMutationVariables
>;
export const FollowUserDocument = gql`
  mutation FollowUser($followType: FollowType!, $userId: String!) {
    followUser(followType: $followType, userId: $userId) {
      code
      success
      message
      user {
        ...user
      }
    }
  }
  ${UserFragmentDoc}
`;
export type FollowUserMutationFn = Apollo.MutationFunction<
  FollowUserMutation,
  FollowUserMutationVariables
>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      followType: // value for 'followType'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowUserMutation(
  baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(
    FollowUserDocument,
    options,
  );
}
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<
  FollowUserMutation,
  FollowUserMutationVariables
>;
export const UpdateAvatarDocument = gql`
  mutation UpdateAvatar($oldPhotoUrl: String!, $base64Photo: String!) {
    updateAvatar(oldPhotoUrl: $oldPhotoUrl, base64Photo: $base64Photo) {
      code
      success
      avatar
    }
  }
`;
export type UpdateAvatarMutationFn = Apollo.MutationFunction<
  UpdateAvatarMutation,
  UpdateAvatarMutationVariables
>;

/**
 * __useUpdateAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAvatarMutation, { data, loading, error }] = useUpdateAvatarMutation({
 *   variables: {
 *      oldPhotoUrl: // value for 'oldPhotoUrl'
 *      base64Photo: // value for 'base64Photo'
 *   },
 * });
 */
export function useUpdateAvatarMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateAvatarMutation, UpdateAvatarMutationVariables>(
    UpdateAvatarDocument,
    options,
  );
}
export type UpdateAvatarMutationHookResult = ReturnType<typeof useUpdateAvatarMutation>;
export type UpdateAvatarMutationResult = Apollo.MutationResult<UpdateAvatarMutation>;
export type UpdateAvatarMutationOptions = Apollo.BaseMutationOptions<
  UpdateAvatarMutation,
  UpdateAvatarMutationVariables
>;
export const GetSessionDocument = gql`
  query GetSession {
    getSession {
      code
      success
      accessToken
      user {
        ...user
      }
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useGetSessionQuery__
 *
 * To run a query within a React component, call `useGetSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSessionQuery(
  baseOptions?: Apollo.QueryHookOptions<GetSessionQuery, GetSessionQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, options);
}
export function useGetSessionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSessionQuery, GetSessionQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSessionQuery, GetSessionQueryVariables>(
    GetSessionDocument,
    options,
  );
}
export type GetSessionQueryHookResult = ReturnType<typeof useGetSessionQuery>;
export type GetSessionLazyQueryHookResult = ReturnType<typeof useGetSessionLazyQuery>;
export type GetSessionQueryResult = Apollo.QueryResult<GetSessionQuery, GetSessionQueryVariables>;
export const GetCommentsDocument = gql`
  query GetComments($postId: ID!, $limit: Int!, $cursor: String) {
    getComments(postId: $postId, limit: $limit, cursor: $cursor) {
      code
      success
      message
      comments {
        ...comment
      }
      cursor
      hasMore
    }
  }
  ${CommentFragmentDoc}
`;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
}
export function useGetCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(
    GetCommentsDocument,
    options,
  );
}
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsQueryResult = Apollo.QueryResult<
  GetCommentsQuery,
  GetCommentsQueryVariables
>;
export const GetConversationByIdDocument = gql`
  query GetConversationById($conversationId: String!) {
    getConversationById(conversationId: $conversationId) {
      code
      success
      message
      conversation {
        ...conversation
      }
    }
  }
  ${ConversationFragmentDoc}
`;

/**
 * __useGetConversationByIdQuery__
 *
 * To run a query within a React component, call `useGetConversationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationByIdQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useGetConversationByIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetConversationByIdQuery, GetConversationByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetConversationByIdQuery, GetConversationByIdQueryVariables>(
    GetConversationByIdDocument,
    options,
  );
}
export function useGetConversationByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetConversationByIdQuery,
    GetConversationByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetConversationByIdQuery, GetConversationByIdQueryVariables>(
    GetConversationByIdDocument,
    options,
  );
}
export type GetConversationByIdQueryHookResult = ReturnType<typeof useGetConversationByIdQuery>;
export type GetConversationByIdLazyQueryHookResult = ReturnType<
  typeof useGetConversationByIdLazyQuery
>;
export type GetConversationByIdQueryResult = Apollo.QueryResult<
  GetConversationByIdQuery,
  GetConversationByIdQueryVariables
>;
export const GetConversationsDocument = gql`
  query GetConversations($limit: Int!, $cursor: String) {
    getConversations(limit: $limit, cursor: $cursor) {
      code
      success
      message
      cursor
      hasMore
      conversations {
        ...conversation
      }
    }
  }
  ${ConversationFragmentDoc}
`;

/**
 * __useGetConversationsQuery__
 *
 * To run a query within a React component, call `useGetConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetConversationsQuery(
  baseOptions: Apollo.QueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetConversationsQuery, GetConversationsQueryVariables>(
    GetConversationsDocument,
    options,
  );
}
export function useGetConversationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetConversationsQuery, GetConversationsQueryVariables>(
    GetConversationsDocument,
    options,
  );
}
export type GetConversationsQueryHookResult = ReturnType<typeof useGetConversationsQuery>;
export type GetConversationsLazyQueryHookResult = ReturnType<typeof useGetConversationsLazyQuery>;
export type GetConversationsQueryResult = Apollo.QueryResult<
  GetConversationsQuery,
  GetConversationsQueryVariables
>;
export const GetMessagesDocument = gql`
  query GetMessages($limit: Int!, $conversationId: ID!, $cursor: String) {
    getMessages(limit: $limit, conversationId: $conversationId, cursor: $cursor) {
      code
      success
      cursor
      hasMore
      messages {
        ...message
      }
    }
  }
  ${MessageFragmentDoc}
`;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      conversationId: // value for 'conversationId'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetMessagesQuery(
  baseOptions: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
}
export function useGetMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(
    GetMessagesDocument,
    options,
  );
}
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<
  GetMessagesQuery,
  GetMessagesQueryVariables
>;
export const GetPostsDocument = gql`
  query GetPosts($cursor: String, $limit: Int!, $query: QueryPostsInput) {
    getPosts(cursor: $cursor, limit: $limit, query: $query) {
      code
      message
      success
      posts {
        ...post
      }
      cursor
      hasMore
    }
  }
  ${PostFragmentDoc}
`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetPostsQuery(
  baseOptions: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
}
export function useGetPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
}
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetProfileDocument = gql`
  query GetProfile($username: String!) {
    getProfile(username: $username) {
      code
      success
      message
      user {
        ...user
      }
      postCounts
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetProfileQuery(
  baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
}
export function useGetProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(
    GetProfileDocument,
    options,
  );
}
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const GetSuggestionsDocument = gql`
  query GetSuggestions($limit: Int!, $page: Int!) {
    getSuggestions(limit: $limit, page: $page) {
      code
      success
      nextPage
      users {
        ...user
      }
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useGetSuggestionsQuery__
 *
 * To run a query within a React component, call `useGetSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuggestionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetSuggestionsQuery(
  baseOptions: Apollo.QueryHookOptions<GetSuggestionsQuery, GetSuggestionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSuggestionsQuery, GetSuggestionsQueryVariables>(
    GetSuggestionsDocument,
    options,
  );
}
export function useGetSuggestionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSuggestionsQuery, GetSuggestionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSuggestionsQuery, GetSuggestionsQueryVariables>(
    GetSuggestionsDocument,
    options,
  );
}
export type GetSuggestionsQueryHookResult = ReturnType<typeof useGetSuggestionsQuery>;
export type GetSuggestionsLazyQueryHookResult = ReturnType<typeof useGetSuggestionsLazyQuery>;
export type GetSuggestionsQueryResult = Apollo.QueryResult<
  GetSuggestionsQuery,
  GetSuggestionsQueryVariables
>;
export const SearchUserDocument = gql`
  query SearchUser($query: String!, $limit: Int!) {
    searchUser(query: $query, limit: $limit) {
      code
      success
      users {
        ...baseUser
      }
    }
  }
  ${BaseUserFragmentDoc}
`;

/**
 * __useSearchUserQuery__
 *
 * To run a query within a React component, call `useSearchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserQuery({
 *   variables: {
 *      query: // value for 'query'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchUserQuery(
  baseOptions: Apollo.QueryHookOptions<SearchUserQuery, SearchUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
}
export function useSearchUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchUserQuery, SearchUserQueryVariables>(
    SearchUserDocument,
    options,
  );
}
export type SearchUserQueryHookResult = ReturnType<typeof useSearchUserQuery>;
export type SearchUserLazyQueryHookResult = ReturnType<typeof useSearchUserLazyQuery>;
export type SearchUserQueryResult = Apollo.QueryResult<SearchUserQuery, SearchUserQueryVariables>;
