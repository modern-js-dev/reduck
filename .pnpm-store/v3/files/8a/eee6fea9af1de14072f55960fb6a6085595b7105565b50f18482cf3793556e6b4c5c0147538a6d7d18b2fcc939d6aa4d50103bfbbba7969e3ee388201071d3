import * as devcert from 'devcert';
export const genHttpsOptions = async userOptions => {
  const httpsOptions = userOptions === true ? {} : userOptions;

  if (!httpsOptions.key || !httpsOptions.cert) {
    const selfsign = await devcert.certificateFor(['localhost']);
    return selfsign;
  }

  return httpsOptions;
};