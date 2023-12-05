import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import minify from "string-minify"
const convertDocToChunks = async (url) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 700,
    chunkOverlap: 50,
  })
  const loader = new PDFLoader(url)

  let doc = await loader.load()
  let text = ""
  doc.forEach((page) => (text += page.pageContent))

  text = minify(text)
  let chunks = await splitter.createDocuments([text])
  chunks = chunks.map((chunk) => chunk.pageContent)
  return chunks
}

export { convertDocToChunks }
