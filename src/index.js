/* eslint-disable no-param-reassign */
// @flow

import DiffModel from './Diff';

export default function plugin(schema: any, options: any) {
  const collectionName =
    (options && options.customCollectionName) || `${this.mongooseCollection.collectionName}_diff`;

  const Diff = DiffModel(collectionName, options);

  schema.post('init', () => {
    this._original = this.toObject();
  });

  schema.pre('save', async next => {
    const lhs = this._original;
    const rhs = this.toObject();
    // make diffs with deep-diff
    await Diff.create(lhs._id, diffs);
    this._original = null;
    return next();
  });

  // // Listen on update
  // schema.pre('update', next => {
  //   processUpdate.call(this, next);
  // });

  // // Listen on updateOne
  // schema.pre('updateOne', next => {
  //   processUpdate.call(this, next);
  // });

  // // Listen on findOneAndUpdate
  // schema.pre('findOneAndUpdate', next => {
  //   processUpdate.call(this, next);
  // });

  // // Create a copy on remove
  // schema.pre('remove', next => {
  //   const d = this.toObject();
  //   const historyDoc = createHistoryDoc(d, 'r');

  //   saveHistoryModel(this.toObject(), d, historyDoc, this.collection.name, next);
  // });

  // // Create a copy on findOneAndRemove
  // schema.post('findOneAndRemove', (doc, next) => {
  //   processRemove.call(this, doc, next);
  // });

  schema.statics.diffModel = () => Diff;
}

export function saveDiffModel(
  original: any,
  d: any,
  historyDoc: any,
  collectionName: any,
  next: any
) {
  const Diff = new DiffModel(collectionName, options);
  Diff.save(next);
}


};
