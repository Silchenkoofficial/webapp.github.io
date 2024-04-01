function parseJSON(response) {
  if (response.status === 200) {
    if (response.url.includes('control_info')) {
      return true;
    }
    return response.json();
  } else if (response.status === 201) {
    return response.json();
  } else {
    throw response;
  }
}

async function checkStatus(response, url) {
  let error;

  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    window.location.reload();
  }

  if (response.status === 406 || response.status === 403) {
    error = await response.json();
    throw error;
  }

  return response;
}

export async function request(url, options) {
  const fetchResponse = await fetch(url, options);
  const response = await checkStatus(fetchResponse, url);
  return parseJSON(response);
}

export async function unparsedRequest(url, options) {
  const fetchResponse = await fetch(url, options);
  return await checkStatus(fetchResponse, url);
}
