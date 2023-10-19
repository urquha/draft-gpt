import { Type } from '@sinclair/typebox';
import * as fs from 'fs';
import Ajv from 'ajv';
import { SchemaMappings } from './schemas/schema_mappings';
import { readJsonFile, fetchData } from './util';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
// Instantiate Ajv
const ajv = new Ajv({ strict: false });

// Function to validate the API response
function validateApiResponse(response: any, schema: Type, key: String): boolean {
  // Compile your schema with Ajv
  const validate = ajv.compile(schema);
  const valid = validate(response);
  if (!valid) {
    console.log(key);
    console.error(validate.errors); // Log validation errors if any
  }
  return valid;
}

async function processUrl(url: string, key: string, type: Type): Promise<void> {
  try {
    const response = await fetchData(url);

    if (type !== null) {
      const schema_check = validateApiResponse(response, type, key);
      if (schema_check == false) {
        console.log('validation for ' + key, schema_check);
      }
    } else {
      console.log(key, type);
    }

    const filePath = `./data/${key}.json`; // Set the file path and name based on the key
    fs.writeFileSync(filePath, JSON.stringify(response, null, 2)); // Save the response data as a JSON file
  } catch (error: any) {
      console.error(
      `Failed to fetch or validate data for ${key}: ${error.message}`,
    );
  }
}

async function processLinks(links: Record<string, string>): Promise<void> {
  const promises: Promise<void>[] = [];

  for (const [key, url] of Object.entries(links)) {
    const type = SchemaMappings[key];
    if (url.includes('x')) {
      // Ensure the directory exists
      if (!fs.existsSync('data/' + key + '/')) {
        fs.mkdirSync('data/' + key + '/', { recursive: true });
      }
      for (let i = 1; i <= 38; i++) {
        const updatedUrl = url.replace('x', i.toString());
        const updatedKey = key + '/' + i.toString();

        promises.push(processUrl(updatedUrl, updatedKey, type));
      }
    } else {
      promises.push(processUrl(url, key, type));
    }
  }

  // Wait for all requests to complete
  await Promise.all(promises);
}

// Usage
const links = readJsonFile('links.json');

if (links !== null) {
  processLinks(links).catch((error) => {
    console.error(`Failed to process links: ${error.message}`);
  });
} else {
  console.error('Failed to read links');
}
