import * as fs from 'fs';
import axios from 'axios';

// Define a function to read and parse the JSON file
export function readJsonFile(filePath: string): Record<string, string> | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error: any) {
    console.error(`Failed to read or parse JSON file: ${error.message}`);
    return null;
  }
}

export async function fetchData(apiUrl: string): Promise<undefined | any> {
  console.log(apiUrl);
  const response = await axios.get(apiUrl);
  return response.data;
}
