import data from "../data.json";

export async function GET() {
  const featureProducts = data.products.filter((p) => p.featured);

  return Response.json({ data: featureProducts });
}
