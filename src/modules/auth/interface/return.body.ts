import { UserFinger } from 'src/modules/users/user.interface';

export interface ITokenReturnBody {
  user: UserFinger;
  token: IITokenReturnBody;
}

export interface IITokenReturnBody {
  /**
   * When the token is to expire in seconds
   */
  expires: string;
  /**
   * A human-readable format of expires
   */
  expiresPrettyPrint: string;
  /**
   * The Bearer token
   */
  token: string;
}
