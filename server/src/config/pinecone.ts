import { Pinecone } from '@pinecone-database/pinecone';
import { Listing } from '../../../shared/types/Listing'; // Adjust the import path as necessary
import dotenv from 'dotenv';

dotenv.config();

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;

const client = new Pinecone({
  apiKey: PINECONE_API_KEY!,
});

export default client;

export const getPineconeIndex = () => {
  if (!PINECONE_INDEX_NAME) {
    throw new Error('PINECONE_INDEX_NAME is not set in environment variables');
  }
  const pc = client;
  return pc.index(PINECONE_INDEX_NAME);
};

export const createListingVector = (listing: any, embedding: number[]) => {
  return {
    id: `listing-${listing._id}`,
    values: embedding,
    metadata: {
      id: listing._id,
      category: listing.category,

      timestamp: new Date().toISOString(),
    },
  };
};
