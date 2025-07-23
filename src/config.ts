export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5155',
    endpoints: {
      products: '/Products/GetAll'
    }
  }
};