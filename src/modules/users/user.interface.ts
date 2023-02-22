import { Document, ObjectId } from 'mongoose';

export interface UserFinger extends Document {
  readonly email: string;
  readonly username: string;
  password: string;
  role: string;
  isActive: boolean;
}

export interface UpdateRole extends Document {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  role: string;
  isActive: boolean;
}

export interface UserI extends Document {
  readonly username: string;
  readonly password: string;
}
