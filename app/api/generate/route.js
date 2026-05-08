import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      product,
      customer,
      style,
      platform
    } = body;

    const prompt = `
Bạn là chuyên gia quảng cáo cinematic.

Hãy tạo:

1. Hook viral 3 giây đầu
2. Storyboard 5 cảnh
3. Prompt video AI cinematic
4. CTA bán hàng

Thông tin:

Sản phẩm: ${product}
Khách hàng: ${customer}
Phong cách: ${style}
Nền tảng: ${platform}

Viết chuyên nghiệp, cinematic, viral.
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    return Response.json({
      output: text,
    });

  } catch (error) {

    return Response.json({
      error: error.message,
    });

  }
}