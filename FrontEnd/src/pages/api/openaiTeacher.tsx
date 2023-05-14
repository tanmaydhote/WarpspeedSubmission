import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;
    const grade = data.grade;
    const difficulty = data.difficulty;
    const typeOfQuestion = data.typeOfQuestion;
    const language = data.language;
    const pdftext = data.pdftext;

    console.log(data);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are an education coach whose job is to help students learn a concept better through assessments and corrective assistance." },
            { role: "user", content: `Generate 1 [${difficulty}] [${typeOfQuestion}] Question suitable for grade [${grade}] student from the topic given below. Restrict the question to the scope of the content given. Make sure the question are in [${language}] and are [${difficulty}] for a [${grade}] grade student. Do not share the correct answers. Do not explain the answer. Do not include any additional text other than the question. Content- "[${pdftext}]"`}
        ],
    });

    const responseData = completion.data.choices[0].message?.content;
    console.log("responseData : ", responseData);

    res.status(200).json({ responseData : responseData });
}