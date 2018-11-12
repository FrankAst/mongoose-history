// @flow

import mongoose from 'mongoose';
import DB from './db';

export const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      description: 'Provider who send Post',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'Post',
  }
);


export class PostDoc /* :: extends Mongoose$Document */ {
  title: string;
}

PostSchema.loadClass(PostDoc);

export const Post = DB.data.model('Post', PostSchema);
