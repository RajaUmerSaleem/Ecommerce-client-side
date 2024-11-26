import connectDB from '@/lib/mongoose';
import Order from '@/models/Order';

export async function GET(req) {
    await connectDB();

    try {
        const orders = await Order.find({});
        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();

    try {
        const orderData = await req.json();
        const newOrder = new Order(orderData);
        await newOrder.save();
        return new Response(JSON.stringify(newOrder), { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
