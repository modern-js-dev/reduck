import { getNpmVersion } from '@/utils';

describe('getNpmVersion function test', () => {
  it('package exists', async () => {
    const version = await getNpmVersion('lodash');
    expect(typeof version).toBe('string');
  });
  it('package not exists', async () => {
    try {
      await getNpmVersion('lodash_xx');
    } catch (e) {
      expect(e.message).toContain('Package `lodash_xx` could not be found');
    }
  });
});
