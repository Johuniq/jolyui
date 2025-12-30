import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> },
) {
  const { category } = await params;

  try {
    const response = await fetch(
      `https://pub-9d930947644b416382475d2dde965721.r2.dev/icons/${category}.json`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 3600, // Cache for 1 hour
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch icons" },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Error fetching icons:", error);
    return NextResponse.json(
      { error: "Failed to fetch icons" },
      { status: 500 },
    );
  }
}
