const handleRes = res => {
  const contentType = res.headers.get('content-type');

  if (contentType !== null && contentType !== void 0 && contentType.includes('application/json') || contentType !== null && contentType !== void 0 && contentType.includes('text/json')) {
    return res.json();
  }

  if (contentType !== null && contentType !== void 0 && contentType.includes('text/html') || contentType !== null && contentType !== void 0 && contentType.includes('text/plain')) {
    return res.text();
  }

  if ((contentType !== null && contentType !== void 0 && contentType.includes('application/x-www-form-urlencoded') || contentType !== null && contentType !== void 0 && contentType.includes('multipart/form-data')) && res instanceof Response) {
    return res.formData();
  }

  if (contentType !== null && contentType !== void 0 && contentType.includes('application/octet-stream')) {
    return res.arrayBuffer();
  }

  return res.text();
};

export { handleRes };