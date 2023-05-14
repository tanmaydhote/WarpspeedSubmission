import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;

    const question = data.question;
    const answer = data.answer;

    console.log(data);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are an education coach whose job is to help students learn a concept better through assessments and corrective assistance." },
            { role: "user", content: `Understand the question being asked to the student and evaluate the answer the student is giving. 

            If the answer is correct, only then share a higher rigor-level question on the same topic. 
            If the answer is incorrect, tell the student in a positive manner that their answer is incorrect, then go on to explain the answer in a step-by-step manner explaining the underlying concept. Also, ask them a simpler question that might help them build their knowledge.
            If the student does not know the answer, tell the student in a positive manner that their answer is incorrect, then go on to explain the concept in a step-by-step manner. Ask them a simpler question based on the explanation.
            
            Please restrict the explanation to the scope of the question and concept. Also, make sure the explanations are suitable to be understood by a [6]th grade student.
            Use the same language as that in the question.
            
            Question- "${question}"
            Answer by the student- "${answer}"`}
        ],
    });

    const resposneRole = completion.data.choices[0].message?.role;
    const responseData = completion.data.choices[0].message?.content;
    console.log("responseData : ", responseData);

    res.status(200).json({ responseRole  : resposneRole, responseData : responseData });
}