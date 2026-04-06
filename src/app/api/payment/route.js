import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, paymentMethodId } = body;

    // Simulate backend payment logic
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock response
    return NextResponse.json({
      success: true,
      message: 'Payment processed successfully',
      id: 'PAY-' + Math.random().toString(36).substr(2, 9),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
