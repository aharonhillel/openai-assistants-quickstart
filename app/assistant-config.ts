export let assistantId = "asst_ISbEt1MmY3Ilvm9RJTqUwe8P"; // set your assistant ID here

if (assistantId === "") {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
}
