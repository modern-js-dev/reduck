import { getPackageInfo } from '@/utils';

describe('getPackageInfo function test', () => {
  it('package not start with @', async () => {
    const packageInfo = await getPackageInfo('lodash@4.17.2');
    expect(packageInfo).toEqual({
      name: 'lodash',
      version: '4.17.2',
    });
  });
  it('package start with @', async () => {
    const packageInfo = await getPackageInfo('@babel/runtime@^7.14.8');
    expect(packageInfo).toEqual({
      name: '@babel/runtime',
      version: '^7.14.8',
    });
  });
  it('package start with @, but not contains version', async () => {
    const packageInfo = await getPackageInfo('@babel/runtime');
    expect(packageInfo).toEqual({
      name: '@babel/runtime',
      version: 'latest',
    });
  });
});
