import { questionSchema, questionsSchema } from "@/lib/schemas";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { files } = await req.json();

    // Check if files are provided
    if (!files || files.length === 0) {
      return new Response("No files provided", { status: 400 });
    }

    const firstFile = files[0]?.data;
    if (!firstFile) {
      return new Response("File data is missing", { status: 400 });
    }
    
    // Process the file in a way that handles larger sizes
    const result = streamObject({
      model: google("gemini-1.5-pro-latest"),
      messages: [
        {
          role: "system",
          content:
            "You are a teacher. Your job is to take a document, and create a multiple choice test (with 60 questions) based on the content of the document. Each option should be roughly equal in length.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Create a multiple choice test based on this document.",
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
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
