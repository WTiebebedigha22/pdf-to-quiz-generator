import { questionSchema, questionsSchema } from "@/lib/schemas";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { files } = await req.json();
  const firstFile = files[0].data;

  const result = streamObject({
    model: google("gemini-1.5-pro-latest"),
    messages: [
      {
        role: "system",
        content:
          "Generate 40 multiple-choice questions based on the content of the uploaded PDF",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Create a multiple choice test (with 40 questions) based on this document.",
          },
          {
            type: "file",
            data: firstFile,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
    schema: questionSchema,
    output: "array",
    onFinish: ({ object }) => {
      const res = questionsSchema.safeParse(object);
      if (res.error) {
        throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      }
    },
  });

  return result.toTextStreamResponse();
}
