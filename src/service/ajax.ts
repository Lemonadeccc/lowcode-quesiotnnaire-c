const HOST = "http://localhost:3001"; //MOCK的host

export async function get(url: string) {
  //axios  nodejs
  const res = await fetch(`${HOST}${url}`);
  const data = res.json();
  return data;
}

export async function post(url: string, body: any) {
  const res = await fetch(`${HOST}${url}`, {
    method: "post",
    body: JSON.stringify(body),
  });
  const data = res.json();
  return data;
}
