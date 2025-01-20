const apiRequest = async (
  endpoint,
  header = "application/json",
  method = "GET",
  body = null,
  token = null
) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Your base API URL

  const headers = {
    "Content-Type": `${header}`,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Request Error:", error.message);
    throw error;
  }
};
