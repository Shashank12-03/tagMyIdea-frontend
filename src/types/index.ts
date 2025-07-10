export interface User {
  following: unknown[];
  followers: unknown[];
  dateJoined: unknown;
  links: never[];
  photo: string;
  username: string;
  id: string;
  email: string;
  bio?: string;
  ideasPosted: ProjectIdea[]; 
  saveIdeas: ProjectIdea[];
}

export interface ProjectIdea {
  username: string | undefined;
  userId : string;
  photo: string;
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  tags: 'easy' | 'medium' | 'hard';
  howToBuild: string;
  estimatedTime?: string;
  createdAt: string;
  upvotes: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  projectId: string;
  createdAt: string;
  likes: number;
}
