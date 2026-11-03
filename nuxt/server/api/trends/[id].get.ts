import { trends } from "../../data/trends";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  const trend = trends.find((item) => item.id === id);

  if (!trend) {
    throw createError({
      statusCode: 404,
      statusMessage: "Trend not found",
    });
  }

  return trend;
});
