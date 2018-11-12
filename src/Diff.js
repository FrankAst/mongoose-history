// @flow

import mongoose, { Schema, type ObjectId } from 'mongoose';

export default function(collectionName: string, options: Object): any {
  const ChangeSchema = new Schema(
    {
      kind: {
        type: String,
        enum: ['E', 'N', 'D', 'A'],
      },
      path: [String],
      lhs: Schema.Types.Mixed,
      rhs: Schema.Types.Mixed,
    },
    {
      id: false,
      versionKey: false,
    }
  );

  class ChangeDoc /* :: extends Mongoose$Document */ {
    kind: 'E' | 'N' | 'D' | 'A';
    path: Array<string>;
    lhs: any;
    rhs: any;
  }

  ChangeSchema.loadClass(ChangeDoc);

  const DiffSchema = new Schema(
    {
      docId: Schema.Types.ObjectId,
      changes: [ChangeSchema],
    },
    { versionKey: false, timestamps: true }
  );

  class DiffDoc /* :: extends Mongoose$Document */ {
    docId: ObjectId;
    changes: Array<ChangeDoc>;

    static async create(docId: ObjectId, changes: any): Promise<DiffDoc> {
      const doc = new this({ docId, changes });
      return doc.save();
    }
  }

  DiffSchema.loadClass(DiffDoc);

  if (options && options.indexes) {
    options.indexes.forEach(idx => DiffSchema.index(idx));
  }

  const Diff = mongoose.model(collectionName, DiffSchema);
  return Diff;
}
