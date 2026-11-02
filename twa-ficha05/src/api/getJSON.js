export async function getJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`O servidor respondeu ${res.status}`)
  return res.json()
}