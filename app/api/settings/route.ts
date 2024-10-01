import { connectToDb } from "@/utils/config/mongodb";
import { Settings } from "@/utils/models/Settings";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET request for fetching banner and promotion details
export async function GET() {
  try {
    // Ensure the database connection is established
    await connectToDb();

    // Fetch the settings document (assuming only one document exists)
    const settings = await Settings.findOne().populate({
      path: "promotion.productId", // The path to populate
      select: "title price images features", // Specify fields to select from the Product model
    });

    // If no settings document exists, return a 404 response
    if (!settings) {
      return NextResponse.json({ error: "No settings found" }, { status: 404 });
    }

    const responseHeaders = {
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    };

    return NextResponse.json(
      {
        banner: settings.banner,
        promotion: settings.promotion,
        status: 200,
      },
      { headers: responseHeaders }
    );
    // Return the banner and promotion details with a 200 status
  } catch (error) {
    // Type guard to check if 'error' has a 'message' property
    if (error instanceof Error) {
      // Log the specific error message for debugging purposes
      console.error("Error fetching settings data:", error.message);

      // Return a 500 error response with the error message
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Handle cases where the error is not an instance of Error
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
