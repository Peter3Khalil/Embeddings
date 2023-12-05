// Function to calculate the dot product of two vectors
function dotProduct(vector1, vector2) {
  return vector1.reduce((acc, val, index) => acc + val * vector2[index], 0)
}

// Function to calculate the magnitude of a vector
function magnitude(vector) {
  return Math.sqrt(vector.reduce((acc, val) => acc + val ** 2, 0))
}

// Function to calculate cosine similarity
function cosineSimilarity(vector1, vector2) {
  const dot = dotProduct(vector1, vector2)
  const mag1 = magnitude(vector1)
  const mag2 = magnitude(vector2)

  if (mag1 === 0 || mag2 === 0) {
    // Handle division by zero error
    return 0
  }

  return dot / (mag1 * mag2)
}

//export
export { cosineSimilarity };