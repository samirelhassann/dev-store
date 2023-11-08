import data from "../data.json";

export async function GET() {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  const featureProducts = data.products.filter((p) => p.featured);

  return Response.json({ data: featureProducts });
}
