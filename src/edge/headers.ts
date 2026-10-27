/** Adds `field` to the Vary header unless it is already listed. */
export function appendVary(headers: Headers, field: string) {
  const values = (headers.get("Vary") ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (!values.some((value) => value.toLowerCase() === field.toLowerCase()))
    values.push(field);
  headers.set("Vary", values.join(", "));
}
