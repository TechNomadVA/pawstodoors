export type ProfileRole = "owner" | "admin";

export interface Profile {
  id: string;
  display_name: string | null;
  role: ProfileRole;
  created_at: string;
  updated_at: string;
}

export interface Dog {
  id: string;
  name: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface DogOwner {
  dog_id: string;
  owner_id: string;
  created_at: string;
}

export type PostType = "photo" | "video" | "status";

export interface Post {
  id: string;
  dog_id: string;
  type: PostType;
  content: string | null;
  media_urls: string[];
  created_at: string;
  updated_at: string;
}

export type RequestType = "extra_walk" | "holiday" | "break" | "other";

export type RequestStatus = "pending" | "acknowledged" | "completed";

export interface Request {
  id: string;
  dog_id: string;
  owner_id: string;
  type: RequestType;
  message: string | null;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
}
