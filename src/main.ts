import express, { Request, Response } from 'express';
import fs from 'fs/promises';

const app = express();
const port = 3000;

interface DataItem {
  email: string;
  number?: string;
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

async function getData() {
  try {
    const fileContent = await fs.readFile('./src/data.json', 'utf-8');
    return JSON.parse(fileContent);
  } catch (error: any) {
    throw new Error(`Error reading JSON file: ${error.message}`);
  }
}

let currentRequest: NodeJS.Timeout | null = null;

app.get('/api/get', async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    const number = req.query.number;

    if (!email) {
      throw new Error('Type is required');
    }

    if (currentRequest) {
      clearTimeout(currentRequest);
    }

    currentRequest = setTimeout(async () => {
      const data = await getData();
      const filteredData = data.filter((item: DataItem) => {
        if (number) {
          return item.email === email && item.number === number;
        }
        return item.email === email;
      });
      res.json(filteredData);
    }, 5000);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
