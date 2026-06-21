import { NextRequest, NextResponse } from "next/server";
import { sendReservationEmail } from "@/app/actions/reservation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, guests, date, time, notes } = body;

    if (!name || !email || !phone || !guests || !date || !time) {
      return NextResponse.json(
        { error: "Hiányzó kötelező mezők." },
        { status: 400 },
      );
    }

    const result = await sendReservationEmail({
      name,
      email,
      phone,
      guests,
      date,
      time,
      notes,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("API hiba:", error);
    return NextResponse.json(
      { error: "Belső szerver hiba." },
      { status: 500 },
    );
  }
}
