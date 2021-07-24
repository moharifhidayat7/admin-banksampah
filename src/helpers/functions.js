export function formatRp(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(number)
    .slice(0, -3);
}
export function toQueryString(query, exclude) {
  for (let i = 0; i < exclude.length; i++) {
    delete query[exclude[i]];
  }
  return Object.keys(query)
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`;
    })
    .join("&");
}
