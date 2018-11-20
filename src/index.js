// @flow
/* eslint-disable no-param-reassign, func-names */

import deepDiff from 'deep-diff';
import DiffModel from './Diff';

export default function plugin(schema: any, options: any) {
  const collectionName = (options && options.customCollectionName) || `collection_diff`; // ${this.mongooseCollection.collectionName}

  const Diff = DiffModel(collectionName, options);

  schema.statics.diffModel = () => Diff;

  schema.post('init', function() {
    this._original = this.toObject();
  });

  schema.pre('save', async function() {
    if (!this.isNew) {
      const lhs = this._original;
      const rhs = this.toObject();
      const diffs = deepDiff.diff(lhs, rhs);
      await Diff.createDiff(lhs._id, diffs);
      this._original = null;
    }
  });
}
