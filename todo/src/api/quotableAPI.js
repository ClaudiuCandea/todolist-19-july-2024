export async function getData() {
  const url = "https://api.quotable.io/random";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const content = json.content;
    const author = json.author;

    return { content, author };
  } catch (error) {
    console.error(error.message);
  }
}
