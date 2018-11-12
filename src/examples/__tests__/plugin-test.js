// @flow

import { Post } from '../Post';

jest.mock('../db');

describe('plugin', () => {
  it('create history model', async () => {
    const post = new Post({ title: 'new' });
    await post.save();

    expect(post.title).toBe('new');
  });
});
