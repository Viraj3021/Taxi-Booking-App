import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";
export async function GET(request: any) {
  const { searchParams } = new URL(request.url);

  const searchText = searchParams.get("q");

  const res = await fetch(
    BASE_URL +
      "?q=" +
      searchText +
      "language=en&limit=8&session_token=5ccce4a4-ab0a-4a7c-943d-580e55542363&proximity=-83.748708,42.265837&country=US" +
      "&access_token=" +
      process.env.MAPBOX_ACCESS_TOKEN,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  const searchResult = await res.json();
  return NextResponse.json(searchResult);
}
