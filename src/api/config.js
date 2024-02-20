export const fetchData = async (method, query, config) => {
  const url = "https://jsonplaceholder.typicode.com";

  const res = await fetch(`${url}/${query}`, { method: method, ...config });
  const data = await res.json();
  return data;
};
