export async function GET(request: Request) {
  const response = await fetch(
    "https://sonnytestapp.azurewebsites.net/api/getImages",
    {
      cache: "no-store",
    }
  );

  const blob = await response.blob();
  const textData = await blob.text();

  const data = JSON.parse(textData);

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
