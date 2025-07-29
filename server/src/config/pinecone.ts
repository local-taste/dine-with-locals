import { Pinecone } from '@pinecone-database/pinecone';
import { ListingDetails } from '../../../shared/types/ListingDetails'; // Adjust the import path as necessary
import dotenv from 'dotenv';

dotenv.config();

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;

const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;

export const initializePinecone = () => {
  if (!PINECONE_API_KEY) {
    throw new Error('PINECONE_API_KEY is not set in environment variables');
  }

  if (!PINECONE_INDEX_NAME) {
    throw new Error('PINECONE_INDEX_NAME is not set in environment variables');
  }

  return new Pinecone({
    apiKey: PINECONE_API_KEY,
  });
};

export const getPineconeIndex = () => {
  if (!PINECONE_INDEX_NAME) {
    throw new Error('PINECONE_INDEX_NAME is not set in environment variables');
  }
  const pc = initializePinecone();
  return pc.index(PINECONE_INDEX_NAME);
};

export const createListingVector = (
  listing: ListingDetails,
  embedding: number[],
) => {
  return {
    id: `listing-${listing._id}`,
    values: embedding,
    metadata: {
      category: listing.category,
      city: listing.locationId?.city,
      hostId: listing.userId.toString(),
      timestamp: new Date().toISOString(),
    },
  };
};
