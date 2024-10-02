import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path") || "/";

  const analytics = new BetaAnalyticsDataClient({
    credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || ""),
  });

  try {
    const [response] = await analytics.runReport({
      property: `properties/${process.env.GOOGLE_ANALYTICS_PROPERTY}`,
      dateRanges: [{ startDate: "2015-08-14", endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      dimensionFilter: {
        filter: {
          fieldName: "pagePath",
          stringFilter: {
            matchType: "EXACT",
            value: path,
          },
        },
      },
    });

    const pageViews = response.rows?.[0]?.metricValues?.[0]?.value || "0";
    return NextResponse.json({ pageViews });
  } catch (error) {
    console.error("구글 애널리틱스 에러:", error);
    return NextResponse.json(
      { error: "구글 애널리틱스 데이터 호출 실패" },
      { status: 500 }
    );
  }
}
