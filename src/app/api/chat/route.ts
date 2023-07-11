const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
/**
 * A simple function that makes a request to the Azure Open AI API.
 */
const azureOpenAIRequest = async (prompt: JSON) => {
  // get all the environement settings
  const azureOpenAIEndPoint = process.env.AZURE_OPENAI_ENDPOINT;
  const azureOpenAIApiKey = process.env.AZURE_OPENAI_KEY;
  const azureOpenAIModel = process.env.AZURE_OPENAI_MODEL;
  const client = new OpenAIClient(azureOpenAIEndPoint, new AzureKeyCredential(azureOpenAIApiKey));        
  const completion = await client.getChatCompletions(azureOpenAIModel,prompt);
  return completion.choices[0].message?.content;
};
/**
 * Main entry point for the API.
 **/
export async function POST(request: Request) {    
    // Extract the `prompt` from the body of the request
    const { messages } = await request.json()
    const response = await azureOpenAIRequest(messages);
    return new Response(response);
}