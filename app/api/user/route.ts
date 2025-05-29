import { NextRequest, NextResponse } from 'next/server';
import { generateKeyPairSync } from 'crypto';
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { encryptText, generateKey } from '@/lib/encryptEmail';

const dataDir = join(process.cwd(), 'data');
const filePath = join(dataDir, 'data.json');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, email } = body;

    if (!id || !name || !email) {
      return NextResponse.json(
        { message: 'Missing required fields: id, name, or email' },
        { status: 400 }
      );
    }

    // Generate RSA key pair
    const { publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    // Create data dir if not exist
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir);
    }

    // Load existing data
    let existingData: any[] = [];
    if (existsSync(filePath)) {
      const fileData = readFileSync(filePath, 'utf-8');
      existingData = JSON.parse(fileData);
    }

    const key = await generateKey();

    console.log(encryptText(email, key))

    const newEntry = {
      id,
      name,
      email: await encryptText(email, key),
      publicKey,
      createdAt: new Date().toISOString(),
    };

    existingData.push(newEntry);

    // Save to file
    writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return NextResponse.json({ message: 'Key pair generated and saved.', publicKey });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to generate keys', error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!existsSync(filePath)) {
      return NextResponse.json({ data: [], message: 'No keys found yet.' });
    }

    const fileData = readFileSync(filePath, 'utf-8');
    const json = JSON.parse(fileData);

    return NextResponse.json({ data: json });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to read keys', error: String(error) },
      { status: 500 }
    );
  }
}
