import qs from "qs";

export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${path}`;
}

export function getStrapiMedia(url: string | null) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${getStrapiURL()}${url}`;
}

export async function fetchAPI<T>(
  path: string,
  urlParamsObject = {},
  locale = "vi",
  options = {}
): Promise<T> {
  const mergedParams = {
    ...urlParamsObject,
    locale,
  };

  // Generate query string
  const queryString = qs.stringify(mergedParams, {
    encodeValuesOnly: true, // prettify URL
  });

  const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    ...options,
  };

  // Make request
  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    throw new Error(`Error fetching ${requestUrl}: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
