import { createListingVector, getPineconeIndex } from '../config/pinecone';
import Listing from '../models/Listing';
import connectDB from '../config/mongo';
import mongoose from 'mongoose';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import '../models/Location';
import '../models/User';

dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Get pinecone index
const pineconeIndex = getPineconeIndex();

export const generateListingEmbedding = async (
  listing: any, // Change to any to handle Mongoose document
): Promise<number[]> => {
  try {
    // Convert to plain object if it's a Mongoose document
    const listingData = listing.toObject ? listing.toObject() : listing;

    const city =
      listingData.locationId && typeof listingData.locationId === 'object'
        ? listingData.locationId.city
        : '';
    const address =
      listingData.locationId && typeof listingData.locationId === 'object'
        ? listingData.locationId.address
        : '';

    // Prepare semantic text for embedding
    const semanticText = [
      listingData.title,
      listingData.description,
      listingData.category,
      Array.isArray(listingData.cuisine) ? listingData.cuisine.join(',') : '',
      Array.isArray(listingData.dietary) ? listingData.dietary.join(',') : '',
      city,
      address,
      `Serves ${listingData.numGuests || 0} guests`,
      `The fee is ${listingData.fee || 0}`,
    ]
      .filter(Boolean)
      .join(' | ');

    // Generate embedding using OpenAI
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: semanticText,
    });

    if (response.data && response.data.length > 0) {
      return response.data[0].embedding;
    } else {
      throw new Error('No embedding data returned from OpenAI');
    }
  } catch (error) {
    console.error('Error generating listing embedding:', error);
    throw error;
  }
};

export const embedAllListings = async (): Promise<void> => {
  try {
    console.log('Starting to embed all listings...');
    console.log('Registered models:', mongoose.modelNames());
    const listings = await Listing.find({})
      .populate('locationId', 'address city state country zipCode coordinates')
      .populate('userId', '_id userName firstName lastName avatar');

    console.log(`Found ${listings.length} listings to embed`);

    if (listings.length > 0) {
      console.log('First listing structure:');
      console.log(JSON.stringify(listings[0], null, 2));

      console.log('\nLocationId structure:');
      console.log(JSON.stringify(listings[0].locationId, null, 2));

      console.log('\nUserId structure:');
      console.log(JSON.stringify(listings[0].userId, null, 2));
    }

    for (let i = 0; i < listings.length; i++) {
      const listing = listings[i];

      try {
        console.log(`Processing ${i + 1}/${listings.length}: ${listing.title}`);

        const embedding = await generateListingEmbedding(listing);
        const vector = createListingVector(listing, embedding);

        await pineconeIndex.upsert([vector]);

        console.log(`Embedded: ${listing.title}`);

        // Small delay to avoid rate limits
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`Failed to embed listing ${listing._id}:`, error);
      }
    }

    console.log('🎉 Finished embedding all listings!');
  } catch (error) {
    console.error('Error embedding all listings:', error);
  }
};

// Wait for DB connection before running
const runEmbedding = async () => {
  try {
    // Wait a bit for the connection to establish
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await embedAllListings();
    process.exit(0);
  } catch (error) {
    console.error('Embedding failed:', error);
    process.exit(1);
  }
};

runEmbedding();
