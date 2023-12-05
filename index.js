import { MongoClient,ObjectId } from "mongodb"
import dotenv from "dotenv"
import { cosineSimilarity } from "./utils/cosine_similarity.js"
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf"
import { convertDocToChunks } from "./utils/convertDocToChunks.js"

dotenv.config()
const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env["HUGGING_FACE_API_KEY"],
})

const client = new MongoClient(process.env.MONGODB_ATLAS_URI || "")
const namespace = "langchain.docs"
const [dbName, collectionName] = namespace.split(".")
const collection = client.db(dbName).collection(collectionName)
// console.log(await embeddings.embedDocuments(["hello world", "Bye Bye"]))

// delete all documents
// await collection.deleteMany({})
// let chunks = await convertDocToChunks("doc.pdf")
// //take subset of chunks

// let vectors = await embeddings.embedDocuments(chunks)
// let chunksWithVectors = chunks.map((chunk, index) => {
//   return {
//     chunk,
//     vector: vectors[index],
//   }
// })
// await collection.insertOne({
//     chunks: chunksWithVectors,
// })

//find document by id


let docsFromDB = await collection.findOne({_id:new ObjectId("656f82375793512c9d97d497")})
let chunks = docsFromDB.chunks
let mostRelaventChunk = []
let query = `Web attacks`

query = await embeddings.embedQuery(query)
chunks.forEach((chunk) => {
  const similarity = cosineSimilarity(query, chunk.vector)
  mostRelaventChunk.push({
    chunk: chunk.chunk,
    similarity: similarity,
  })
})

mostRelaventChunk = mostRelaventChunk.filter((chunk) => {
    return chunk.similarity > 0.45
})

console.log(mostRelaventChunk)

// chunks = docsFromDB[0].chunks
// let maxSimilar = 0
// let relaventChunk = null
// let query = "What is the meaning of life?"
// query = await getEmbedding(query)
// chunks.forEach((chunk) => {
//   const similarity = cosineSimilarity(query, chunk.vector)
//   if (similarity > maxSimilar) {
//     maxSimilar = similarity
//     relaventChunk = chunk.chunk
//   }
// })
// console.log(relaventChunk)
// await client.close()
