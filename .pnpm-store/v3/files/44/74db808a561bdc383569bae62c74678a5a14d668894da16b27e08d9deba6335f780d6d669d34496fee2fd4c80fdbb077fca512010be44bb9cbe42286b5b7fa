import { getNpmTarballUrl } from '@/utils';

describe('getNpmTarballUrl function test', () => {
  it('package exists', async () => {
    const tarball = await getNpmTarballUrl('lodash', '4.17.21');
    expect(tarball).toContain('lodash-4.17.21.tgz');
  });
  it('package not exists', async () => {
    try {
      await getNpmTarballUrl('lodash', '4.1.2');
    } catch (e: any) {
      expect(e.message).toContain(
        'Version `4.1.2` for package `lodash` could not be found',
      );
    }
  });
});
