import { connectDB } from "../../lib/db";
import News from "../../models/News";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const news = await News.create(body);

    return Response.json({ success: true, news });
  } catch (error) {
    return Response.json({ success: false, message: error.message });
  }
}
