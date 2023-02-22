// import { extendSchema } from '../../utils/helper';
import { CoreSchema } from '../../../common/models/CoreSchema';
import mongoose from 'mongoose';
import { AppRoles } from 'src/config/role';
import { encryptPassword } from 'src/modules/utils/helper';
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    role: {
      type: String,
      require: true,
      default: AppRoles.USER,
      enum: AppRoles,
    },
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// middle ware auto update username to lowercase
UserSchema.pre('save', function preSave(next) {
  this.email = this.email.toLowerCase();
  if (this.isModified('password'))
    this.password = encryptPassword(this.password);
  next();
});

export { UserSchema };
