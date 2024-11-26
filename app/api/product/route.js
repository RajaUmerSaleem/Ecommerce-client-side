import connectDB from '@/lib/mongoose';
import Product from '@/models/Product';
import category from '@/models/Category';

export async function GET(req) {
  await connectDB();
  try {
    const products = await Product.find({}).populate('category');
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

