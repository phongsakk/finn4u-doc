async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ping`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.text();
}

export default async function Page() {
  const repo = await getData();

  return (
    <main>
      <p>{`${process.env.NEXT_PUBLIC_API_URL}/ping`}</p>
      <p>{repo}</p>
    </main>
  );
}