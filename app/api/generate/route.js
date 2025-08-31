
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  try {
    const { topic, tone } = await request.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are an expert LinkedIn content creator. Generate 3 distinct LinkedIn post options. For each post:

IMPORTANT FORMATTING RULES:
- Use proper LinkedIn formatting with line breaks for readability
- Include emojis where appropriate to make it engaging
- Add relevant hashtags at the end (3-5 per post)
- Keep it professional but conversational
- Make it actionable and valuable for the reader
- Include a call-to-action or question to encourage engagement

STRUCTURE EACH POST LIKE:
[Engaging hook/opening line]

[Main content with insights/value]

[Key takeaway or actionable advice]

[Question to spark discussion]

[Relevant hashtags]

Return only a JSON object with this structure: { "posts": ["post1", "post2", "post3"] }`
        },
        {
          role: "user",
          content: `Topic: ${topic}. Tone: ${tone}. Generate 3 distinct LinkedIn post options with excellent formatting.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8
    });

    const content = completion.choices[0].message.content;
    const parsedContent = JSON.parse(content);

    return NextResponse.json(parsedContent);

  } catch (error) {
    console.error('Error generating posts:', error);
    return NextResponse.json(
      { error: "Failed to generate posts. Please try again." },
      { status: 500 }
    );
  }
}


