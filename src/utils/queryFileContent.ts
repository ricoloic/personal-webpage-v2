export default async function queryFileContent(sourcePath: string) {
  const url = `https://api.github.com/repos/ricoloic/personal-webpage-v2/contents/src/pages/${sourcePath}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return `${atob(data.content)}`;
  } catch (err) {
    return `// ${url}\n\n// Cannot load content (${url})`;
  }
}

export async function queryFilesContent(sourcePaths: string[]) {
  const queries = sourcePaths.map((sourceFile) => queryFileContent(sourceFile));

  return Promise.all(queries);
}
