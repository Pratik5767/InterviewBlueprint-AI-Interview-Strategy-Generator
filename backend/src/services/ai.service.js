const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require("puppeteer")


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const interviewReportJsonSchema = {
        type: "object",
        properties: {
            matchScore: {
                type: "number",
                description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description."
            },
            technicalQuestions: {
                type: "array",
                description: "Technical questions that can be asked in the interview along with their intension and how to answer them.",
                items: {
                    type: "object",
                    properties: {
                        question: {
                            type: "string",
                            description: "The technical question can be asked in the interview."
                        },
                        intension: {
                            type: "string",
                            description: "The intension of interviewer behind asking this question."
                        },
                        answer: {
                            type: "string",
                            description: "How to answer this question, what points to cover, what approach to take, etc."
                        }
                    },
                    required: ["question", "intension", "answer"]
                }
            },
            behavioralQuestions: {
                type: "array",
                description: "Behavioral questions that can be asked in the interview along with their intension and how to answer them.",
                items: {
                    type: "object",
                    properties: {
                        question: {
                            type: "string",
                            description: "The technical question can be asked in the interview"
                        },
                        intension: {
                            type: "string",
                            description: "The intension of interviewer behind asking this question"
                        },
                        answer: {
                            type: "string",
                            description: "How to answer this question, what points to cover, what approach to take, etc."
                        }
                    },
                    required: ["question", "intension", "answer"]
                }
            },
            skillGaps: {
                type: "array",
                description: "List of skill gaps in the candidate's profile along with their severity",
                items: {
                    type: "object",
                    properties: {
                        skill: {
                            type: "string",
                            description: "The skill which the candidate is lacking"
                        },
                        severity: {
                            type: "string",
                            enum: ["low", "medium", "high"],
                            description: "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances"
                        }
                    },
                    required: ["skill", "severity"]
                }
            },
            preparationPlan: {
                type: "array",
                description: "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively.",
                items: {
                    type: "object",
                    properties: {
                        day: {
                            type: "number",
                            description: "The day number in the preparation plan, starting from 1"
                        },
                        focus: {
                            type: "string",
                            description: "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."
                        },
                        tasks: {
                            type: "array",
                            description: "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
                            items: {
                                type: "string"
                            }
                        }
                    },
                    required: ["day", "focus", "tasks"]
                }
            },
            title: {
                type: "string",
                description: "The title of the job for which the interview report is generated"
            }
        },
        required: [
            "matchScore",
            "technicalQuestions",
            "behavioralQuestions",
            "skillGaps",
            "preparationPlan",
            "title"
        ]
    };

    const interviewReportSchema = z.fromJSONSchema(interviewReportJsonSchema);

    const prompt = `You are an interview coach helping a candidate prepare for a job they really want. You have their background and the job description. Your job is to give them an honest, practical preparation report.

    CANDIDATE BACKGROUND:
    ${resume}

    ABOUT THE CANDIDATE (in their own words):
    ${selfDescription}

    JOB THEY ARE APPLYING FOR:
    ${jobDescription}

    Here is what the report should cover:

    MATCH SCORE:
    - Read every requirement in the job description and compare it honestly against the candidate's profile
    - Do not be generous — if a required skill is missing, it should reflect in the score
    - Score guide: 90+ means near perfect fit, 70-89 means good fit with minor gaps, 50-69 means moderate fit with work needed, below 50 means significant gaps
    - Never go above 85 unless the candidate clearly meets 90% of the requirements
    - Extract the job title EXACTLY as written in the job description — do not rename, upgrade or infer it

    TECHNICAL QUESTIONS:
    - Write 8-10 questions based specifically on the technologies and skills in the job description
    - Do not write generic questions — they should feel like they came from the actual interviewer for this role
    - Mix easy, medium and hard questions naturally
    - For at least 2 questions, tie them back to something specific in the candidate's resume or projects
    - For each question include: the question itself, why an interviewer would ask it, and how the candidate should answer it with what points to cover

    BEHAVIORAL QUESTIONS:
    - Write 5-7 behavioral questions relevant to this specific role and company type
    - Base the answer guidance on the candidate's actual experience from their resume
    - Use STAR format (Situation, Task, Action, Result) for the answer guidance
    - Focus on themes like ownership, handling pressure, working with others, and problem solving

    SKILL GAPS:
    - Go through every skill and tool mentioned in the job description
    - If the candidate doesn't have it or has limited exposure, flag it
    - Be specific — not "cloud experience" but "no hands-on experience with AWS Lambda or API Gateway"
    - Severity: high means it's a core requirement and candidate lacks it, medium means it's preferred and candidate has partial exposure, low means it's a bonus and candidate has transferable skills

    PREPARATION PLAN:
    - Build a 7-14 day plan based on the gaps you found
    - Each day should have one clear focus area
    - Tasks should be specific and actionable — not "study system design" but "read chapters 4-6 of System Design Primer and design a URL shortener"
    - Add resource suggestions where useful — LeetCode, official docs, YouTube channels
    - Keep the last 2 days for mock interviews and revision
    - Make it realistic for someone who may be working full time

    OUTPUT:
    - Return only a valid JSON object matching the schema provided
    - No explanation, no markdown, nothing outside the JSON
    - Job title must be copied exactly from the job description — word for word`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
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

    const resumePdfJsonSchema = {
        type: "object",
        properties: {
            html: {
                type: "string",
                description: "The HTML content of the resume which can be converted to PDF using any library like puppeteer"
            }
        }
    }

    const resumePdfSchema = z.fromJSONSchema(resumePdfJsonSchema)

    const prompt = `You are a professional resume writer. A candidate has come to you for help tailoring their resume for a specific job opening.

    CANDIDATE BACKGROUND:
    ${resume}

    ABOUT THE CANDIDATE (in their own words):
    ${selfDescription}

    JOB THEY ARE APPLYING FOR:
    ${jobDescription}

    Write their resume in HTML format. Here is what I expect:

    CONTENT:
    - Read the job description carefully and align the resume to match it naturally
    - Use the candidate's real experience — do not add anything that isn't there
    - Reframe their existing experience using language that matches the job description
    - Write a 3-4 line summary that fits this role without mentioning any company name
    - Every bullet point should start with an action verb and include a result where possible
    - Include only skills the candidate actually has that are relevant to this role
    - Sections to include: Summary, Experience, Skills, Education, Certifications, Projects

    TONE & STYLE:
    - Write like a human wrote it — natural, confident, not robotic
    - Avoid buzzwords like "passionate", "dynamic", "results-driven", "leverage"
    - Keep sentences short and direct
    - No fluff — every line should add value

    DESIGN:
    - Clean and minimal — a hiring manager should be able to scan it in 6 seconds
    - Single accent color — dark blue or slate
    - Standard fonts only — Arial or Georgia
    - Proper spacing and margins
    - Simple horizontal dividers between sections
    - 1 page preferred, 2 pages max

    OUTPUT:
    - Return only a JSON object: { "html": "..." }
    - HTML must be complete and self-contained with inline CSS
    - No explanation, no markdown, nothing outside the JSON`

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