export let assistantId = "asst_ofPMp0DFIae6gOkbZAkuIT5c"; // set your assistant ID here

if (assistantId === "") {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
}
