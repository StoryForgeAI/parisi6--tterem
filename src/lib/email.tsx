interface ReservationEmailProps {
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  notes?: string;
}

export function createReservationEmailHtml({
  name,
  email,
  phone,
  guests,
  date,
  time,
  notes,
}: ReservationEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Új foglalás - Parisi 6</title>
</head>
<body style="margin:0;padding:0;background-color:#0C0B0A;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0C0B0A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#1A1817;border-radius:12px;overflow:hidden;border:1px solid #2F2D2A;">
          <tr>
            <td style="background:linear-gradient(135deg,#C9A84C,#A8882A);padding:40px 30px;text-align:center;">
              <h1 style="color:#0C0B0A;font-size:28px;margin:0;font-family:Georgia,'Times New Roman',serif;letter-spacing:2px;">PARISI 6</h1>
              <p style="color:#0C0B0A;margin:8px 0 0;font-size:14px;opacity:0.8;">Új foglalási kérelem</p>
            </td>
          </tr>
          <tr>
            <td style="padding:30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #2F2D2A;">
                    <span style="color:#A09890;font-size:12px;display:block;">VENDÉG NEVE</span>
                    <span style="color:#F5F0E8;font-size:16px;display:block;margin-top:4px;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #2F2D2A;">
                    <span style="color:#A09890;font-size:12px;display:block;">EMAIL CÍM</span>
                    <span style="color:#F5F0E8;font-size:16px;display:block;margin-top:4px;">${email}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #2F2D2A;">
                    <span style="color:#A09890;font-size:12px;display:block;">TELEFONSZÁM</span>
                    <span style="color:#F5F0E8;font-size:16px;display:block;margin-top:4px;">${phone}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #2F2D2A;">
                    <span style="color:#A09890;font-size:12px;display:block;">VENDÉGEK SZÁMA</span>
                    <span style="color:#F5F0E8;font-size:16px;display:block;margin-top:4px;">${guests} fő</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #2F2D2A;">
                    <span style="color:#A09890;font-size:12px;display:block;">DÁTUM</span>
                    <span style="color:#F5F0E8;font-size:16px;display:block;margin-top:4px;">${date}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #2F2D2A;">
                    <span style="color:#A09890;font-size:12px;display:block;">IDŐPONT</span>
                    <span style="color:#F5F0E8;font-size:16px;display:block;margin-top:4px;">${time}</span>
                  </td>
                </tr>
                ${
                  notes
                    ? `
                <tr>
                  <td style="padding:12px 0;">
                    <span style="color:#A09890;font-size:12px;display:block;">MEGJEGYZÉS</span>
                    <span style="color:#F5F0E8;font-size:16px;display:block;margin-top:4px;">${notes}</span>
                  </td>
                </tr>
                `
                    : ""
                }
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#0C0B0A;padding:20px 30px;text-align:center;">
              <p style="color:#A09890;font-size:12px;margin:0;">
                Parisi 6 — Párizsi utca 6, Budapest 1052<br>
                +36 30 599 9137
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
