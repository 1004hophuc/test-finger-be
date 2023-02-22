import { Connection } from 'mongoose';
import { LoginLogSchema } from './model/loginLog.model';

export const authProviders = [
  {
    provide: 'LOGIN_LOG_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Login-logs', LoginLogSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
