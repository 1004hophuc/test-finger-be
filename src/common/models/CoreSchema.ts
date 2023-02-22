import mongoose from 'mongoose';
// const { Schema } = mongoose;
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// const CoreSchema = new Schema({
//   id: { type: ObjectId, require: true },
//   createdAt: { type: Number, default: Date.now() },
//   updatedAt: { type: Number, default: Date.now() },
// });

// CoreSchema.pre('save', function preSave(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// export { CoreSchema };

const CoreSchema = new Schema(
  {
    id: { type: ObjectId, require: true },
  },
  {
    timestamps: true,
  },
);

export { CoreSchema };
