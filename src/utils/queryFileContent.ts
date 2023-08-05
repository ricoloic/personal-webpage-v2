export default async function queryFileContent(sourcePath: string) {
  const url = `https://api.github.com/repos/ricoloic/personal-webpage-v2/contents/src/pages/${sourcePath}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return `// ${url}\n\n${atob(data.content)}`;
  } catch (err) {
    return `// ${url}\n\n// Cannot load content`;
  }
}
