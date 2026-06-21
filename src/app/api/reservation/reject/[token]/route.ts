import { NextRequest, NextResponse } from "next/server";
import { rejectReservation } from "@/app/actions/reservation";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  const result = await rejectReservation(token);

  const bgColor = result.success ? "#1A1817" : "#1A1817";
  const accentColor = result.success ? "#E53935" : "#E53935";
  const icon = result.success ? "✕" : "!";
  const title = result.success ? "Foglalás elutasítva" : "Hiba történt";

  const html = `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Parisi 6</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: #0C0B0A;
      color: #F5F0E8;
      font-family: Georgia, 'Times New Roman', serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .card {
      background: ${bgColor};
      border: 1px solid #2F2D2A;
      border-radius: 16px;
      padding: 48px 40px;
      max-width: 480px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }
    .icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: ${accentColor}20;
      color: ${accentColor};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      margin: 0 auto 24px;
      border: 2px solid ${accentColor}40;
    }
    h1 {
      font-size: 24px;
      margin-bottom: 12px;
      letter-spacing: 0.5px;
    }
    p {
      color: #A09890;
      font-size: 15px;
      line-height: 1.6;
      font-family: Arial, sans-serif;
    }
    .brand {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #2F2D2A;
    }
    .brand span {
      color: #C9A84C;
      font-size: 18px;
      letter-spacing: 3px;
    }
    .btn {
      display: inline-block;
      margin-top: 24px;
      padding: 12px 28px;
      background: transparent;
      border: 1px solid #C9A84C40;
      color: #C9A84C;
      text-decoration: none;
      border-radius: 8px;
      font-size: 13px;
      font-family: Arial, sans-serif;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: all 0.3s;
    }
    .btn:hover {
      background: #C9A84C10;
      border-color: #C9A84C;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${icon}</div>
    <h1>${title}</h1>
    <p>${result.message}</p>
    <div class="brand">
      <span>PARISI 6</span>
    </div>
    <a href="/" class="btn">Vissza a főoldalra</a>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
