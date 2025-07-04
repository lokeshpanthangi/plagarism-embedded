# Embedding Model Comparison

This document compares the supported embedding models in this project: **OpenAI** and **Google Gemini**.

| Feature                | OpenAI Embeddings (text-embedding-ada-002) | Google Gemini Embeddings |
|------------------------|--------------------------------------------|-------------------------|
| **Provider**           | OpenAI                                     | Google                  |
| **API**                | OpenAI API                                 | Google Gemini API       |
| **Model Type**         | Transformer-based, dense vector            | Transformer-based, dense vector |
| **Input Limit**        | ~8,191 tokens per request                  | ~8,192 tokens per request (varies) |
| **Output Dimension**   | 1536                                       | 768 (typical, may vary) |
| **Languages Supported**| Multilingual (primarily English, strong multilingual support) | Multilingual (strong support for English and major languages) |
| **Performance**        | Fast, highly optimized, widely used        | Fast, competitive with OpenAI    |
| **Cost**               | Pay-per-use (see [OpenAI Pricing](https://openai.com/pricing)) | Pay-per-use (see [Gemini Pricing](https://cloud.google.com/vertex-ai/pricing)) |
| **API Key Required**   | Yes                                        | Yes                    |
| **Best Use Cases**     | General semantic search, similarity, clustering, classification | General semantic search, similarity, clustering, classification |
| **Integration**        | Easy (official SDKs, REST API)             | Easy (REST API, Google SDKs)    |

## Summary
- **OpenAI Embeddings** are widely adopted, robust, and offer high-quality semantic representations. They are suitable for most English and multilingual tasks, with strong community and documentation support.
- **Google Gemini Embeddings** provide competitive performance, especially for Google Cloud users, and are suitable for similar use cases as OpenAI. They may offer advantages in integration with other Google services.

Both models are transformer-based and provide dense vector representations suitable for semantic similarity and plagiarism detection tasks.