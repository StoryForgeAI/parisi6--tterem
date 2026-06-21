interface BaseEmailProps {
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  notes?: string;
}

interface OwnerEmailProps extends BaseEmailProps {
  confirmUrl: string;
  rejectUrl: string;
}

function emailWrapper(content: string, title: string): string {
  return `
<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#0C0B0A;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0C0B0A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#1A1817;border-radius:12px;overflow:hidden;border:1px solid #2F2D2A;">
          <tr>
            <td style="background:linear-gradient(135deg,#C9A84C,#A8882A,#C9A84C);padding:40px 30px;text-align:center;">
              <h1 style="color:#0C0B0A;font-size:28px;margin:0;font-family:Georgia,'Times New Roman',serif;letter-spacing:3px;text-transform:uppercase;">PARISI 6</h1>
              <p style="color:#0C0B0A;margin:8px 0 0;font-size:13px;opacity:0.8;letter-spacing:1px;font-family:Arial,sans-serif;">${title}</p>
            </td>
          </tr>
          ${content}
          <tr>
            <td style="background-color:#0C0B0A;padding:24px 30px;text-align:center;border-top:1px solid #2F2D2A;">
              <p style="color:#5A524A;font-size:11px;margin:0 0 4px;font-family:Arial,sans-serif;">
                Parisi 6 &mdash; Párizsi utca 6, Budapest 1052
              </p>
              <p style="color:#5A524A;font-size:11px;margin:0;font-family:Arial,sans-serif;">
                +36 30 599 9137 &mdash; parisi6@parisi6.com
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

function infoRow(label: string, value: string): string {
  return `
<tr>
  <td style="padding:10px 30px;border-bottom:1px solid #2F2D2A;">
    <span style="color:#6B6360;font-size:11px;display:block;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.5px;">${label}</span>
    <span style="color:#F5F0E8;font-size:15px;display:block;margin-top:3px;">${value}</span>
  </td>
</tr>`;
}

export function createOwnerEmailHtml(data: OwnerEmailProps): string {
  const notes = data.notes
    ? infoRow("Megjegyzés", data.notes)
    : "";

  return emailWrapper(
    `
<tr>
  <td style="padding:30px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${infoRow("Vendég neve", data.name)}
      ${infoRow("E-mail cím", data.email)}
      ${infoRow("Telefonszám", data.phone)}
      ${infoRow("Vendégek száma", `${data.guests} fő`)}
      ${infoRow("Dátum", data.date)}
      ${infoRow("Időpont", data.time)}
      ${notes}
    </table>
  </td>
</tr>
<tr>
  <td style="padding:0 30px 30px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding-bottom:16px;">
          <span style="color:#6B6360;font-size:11px;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.5px;">Műveletek</span>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:0 0 12px;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="border-radius:8px;" bgcolor="#4CAF50">
                <a href="${data.confirmUrl}" target="_blank" style="display:inline-block;padding:14px 32px;background-color:#4CAF50;color:#FFFFFF;text-decoration:none;border-radius:8px;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;letter-spacing:0.5px;white-space:nowrap;">
                  ✓ Foglalás megerősítése
                </a>
              </td>
              <td style="width:16px;"></td>
              <td style="border-radius:8px;" bgcolor="#E53935">
                <a href="${data.rejectUrl}" target="_blank" style="display:inline-block;padding:14px 32px;background-color:#E53935;color:#FFFFFF;text-decoration:none;border-radius:8px;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;letter-spacing:0.5px;white-space:nowrap;">
                  ✕ Asztal nem elérhető
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>`,
    "Új foglalási kérelem",
  );
}

export function createGuestConfirmationHtml(data: BaseEmailProps): string {
  const notes = data.notes
    ? `<tr><td style="padding:10px 30px"><span style="color:#6B6360;font-size:11px;display:block;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.5px;">Megjegyzés</span><span style="color:#F5F0E8;font-size:15px;display:block;margin-top:3px;">${data.notes}</span></td></tr>`
    : "";

  return emailWrapper(
    `
<tr>
  <td style="padding:30px;">
    <p style="color:#F5F0E8;font-size:16px;line-height:1.7;margin:0 0 20px;">
      Kedves <strong>${data.name}</strong>!
    </p>
    <p style="color:#C9B8A0;font-size:15px;line-height:1.7;margin:0 0 20px;">
      Köszönjük foglalását.
    </p>
    <p style="color:#F5F0E8;font-size:15px;line-height:1.7;margin:0 0 24px;">
      Örömmel értesítjük, hogy asztalfoglalását <strong style="color:#C9A84C;">visszaigazoltuk</strong>.
    </p>
    <p style="color:#F5F0E8;font-size:15px;line-height:1.7;margin:0 0 12px;">
      Várjuk szeretettel éttermünkben:
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#252322;border-radius:8px;margin:16px 0 24px;">
      <tr><td style="padding:16px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${infoRow("Dátum", data.date)}
          ${infoRow("Időpont", data.time)}
          ${infoRow("Létszám", `${data.guests} fő`)}
          ${notes}
        </table>
      </td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#252322;border-radius:8px;margin:16px 0 24px;">
      <tr><td style="padding:16px 24px;">
        <p style="color:#6B6360;font-size:11px;margin:0 0 4px;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.5px;">Cím</p>
        <p style="color:#F5F0E8;font-size:15px;margin:0;line-height:1.5;">
          Parisi 6<br>
          1052 Budapest, Párizsi utca 6.
        </p>
      </td></tr>
    </table>
    <p style="color:#C9B8A0;font-size:14px;line-height:1.7;margin:24px 0 0;">
      Amennyiben kérdése van, keressen minket bizalommal.
    </p>
    <p style="color:#F5F0E8;font-size:15px;line-height:1.7;margin:20px 0 0;">
      Üdvözlettel:<br>
      <span style="font-family:Georgia,'Times New Roman',serif;color:#C9A84C;">Parisi 6</span>
    </p>
  </td>
</tr>`,
    "Foglalása visszaigazolva",
  );
}

export function createGuestRejectionHtml(data: BaseEmailProps): string {
  return emailWrapper(
    `
<tr>
  <td style="padding:30px;">
    <p style="color:#F5F0E8;font-size:16px;line-height:1.7;margin:0 0 20px;">
      Kedves <strong>${data.name}</strong>!
    </p>
    <p style="color:#C9B8A0;font-size:15px;line-height:1.7;margin:0 0 20px;">
      Köszönjük érdeklődését és foglalási kérelmét.
    </p>
    <p style="color:#E53935;font-size:15px;line-height:1.7;margin:0 0 24px;">
      Sajnálattal értesítjük, hogy a választott időpontban jelenleg nem áll rendelkezésre szabad asztal.
    </p>
    <p style="color:#C9B8A0;font-size:14px;line-height:1.7;margin:0 0 20px;">
      Kérjük, próbáljon meg egy másik időpontot választani, vagy vegye fel velünk a kapcsolatot telefonon.
    </p>
    <p style="color:#C9B8A0;font-size:14px;line-height:1.7;margin:0 0 20px;">
      Köszönjük megértését.
    </p>
    <p style="color:#F5F0E8;font-size:15px;line-height:1.7;margin:20px 0 0;">
      Üdvözlettel:<br>
      <span style="font-family:Georgia,'Times New Roman',serif;color:#C9A84C;">Parisi 6</span>
    </p>
  </td>
</tr>`,
    "Foglalásával kapcsolatban",
  );
}
