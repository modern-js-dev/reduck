function delayPromise(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

/**
 * when promise is timeput, reject promise
 * @param {Promise} promise
 * @param {number} ms
 * @param {string} reason
 * @returns {Promise}
 */
export async function timeoutPromise(
  promise: Promise<any>,
  ms: number,
  reason = 'Operation',
) {
  const timeout = delayPromise(ms).then(() => {
    throw new Error(`${reason} timed out after ${ms}ms`);
  });
  return Promise.race([promise, timeout]);
}
