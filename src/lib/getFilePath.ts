export default function getFilePath(filePath: string): string {
  const isDev = process.env.NODE_ENV === "development";
  return isDev
    ? filePath
    : `https://pgmp.me/polimi-agile-innovation-2024-prototype${filePath}`;
}
