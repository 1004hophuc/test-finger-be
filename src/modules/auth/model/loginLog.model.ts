// import { extendSchema } from '../../utils/helper';
import mongoose from 'mongoose';
import { AppRoles } from 'src/config/role';
// import { CoreSchema } from '../../../common/models/CoreSchema';
const LoginLogSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    timeLogin: { type: Date, require: true },
    role: { type: String, require: true, enum: AppRoles },
  },
  {
    timestamps: true,
  },
);

export { LoginLogSchema };
