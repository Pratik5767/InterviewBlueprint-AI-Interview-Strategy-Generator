const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { interviewReportPrompt, resumeGenerationPrompt } = require("../utils/prompts/interview.prompt")
const { interviewReportJsonSchema, resumePdfJsonSchema } = require("../utils/schemas/interview.schema")
const puppeteer = require("puppeteer")


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const interviewReportSchema = z.fromJSONSchema(interviewReportJsonSchema);

    const prompt = interviewReportPrompt({ resume, selfDescription, jobDescription })

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportJsonSchema
        }
    });

    return interviewReportSchema.parse(JSON.parse(response.text));
}


async function generatePdfFromHtml(htmlContent) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({ format: "A4" })
    await browser.close()
    return pdfBuffer
}


async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.fromJSONSchema(resumePdfJsonSchema)

    const prompt = resumeGenerationPrompt({ resume, selfDescription, jobDescription })

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: resumePdfJsonSchema
        }
    })

    const jsonContent = resumePdfSchema.parse(JSON.parse(response.text))

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer
}


module.exports = { generateInterviewReport, generateResumePdf };