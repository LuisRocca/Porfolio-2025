import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, projectType, budget, timeline, message, newsletter } = body

    // Configurar el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: "luismiguel.rocca96@gmail.com", // tu email
        pass: "zmtm niti ngmn ayrx", // tu contraseña de aplicación
      },
    })

    // Configurar el email
    const mailOptions = {
      from: "luismiguel.rocca96@gmail.com",
      to: 'luis.rocca96@gmail.com', // tu email donde recibirás los mensajes
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
        <meta charset="UTF-8">
        <title>Nuevo mensaje de contacto</title>
        </head>
        <body style="margin:0; padding:0; background-color:#0a0a0f; font-family:Arial, sans-serif; color:#e0e0e0;">
        <table width="100%" cellpadding="30" cellspacing="0" style="background-color:#0a0a0f;">
            <tr>
            <td align="center">
                <table width="600" cellpadding="20" cellspacing="0" style="background-color:#1b1b27; border:2px solid #5200ff; border-radius:10px; box-shadow: 0 0 15px rgba(82,0,255,0.5);">
                
                <!-- Encabezado Glitch -->
                <tr>
                    <td align="center" style="padding-bottom:10px;">
                    <h2 style="
                        margin:0; font-size:24px; position:relative; 
                        color:#00ff9f;
                        text-shadow:
                        2px 0 #ff00ff, 
                        -2px 0 #ff00ff, 
                        0 2px #00ffff, 
                        0 -2px #00ffff;
                    ">
                        Nuevo mensaje de contacto
                    </h2>
                    </td>
                </tr>
                
                <!-- Datos del formulario -->
                <tr>
                    <td>
                    <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;">
                        <!-- Fila ejemplo -->
                        <tr>
                        <td width="30%" style="color:#ff00ff; font-weight:bold; border-bottom:1px solid #333;">Nombre:</td>
                        <td style="border-bottom:1px solid #333;">${name}</td>
                        </tr>
                        <tr>
                        <td style="color:#ff00ff; font-weight:bold; border-bottom:1px solid #333;">Email:</td>
                        <td style="border-bottom:1px solid #333;">${email}</td>
                        </tr>
                        <tr>
                        <td style="color:#ff00ff; font-weight:bold; border-bottom:1px solid #333;">Teléfono:</td>
                        <td style="border-bottom:1px solid #333;">${phone || 'No proporcionado'}</td>
                        </tr>
                        <tr>
                        <td style="color:#ff00ff; font-weight:bold; border-bottom:1px solid #333;">Empresa:</td>
                        <td style="border-bottom:1px solid #333;">${company || 'No proporcionado'}</td>
                        </tr>
                        <tr>
                        <td style="color:#ff00ff; font-weight:bold; border-bottom:1px solid #333;">Proyecto:</td>
                        <td style="border-bottom:1px solid #333;">${projectType || 'No especificado'}</td>
                        </tr>
                        <tr>
                        <td style="color:#ff00ff; font-weight:bold; border-bottom:1px solid #333;">Presupuesto:</td>
                        <td style="border-bottom:1px solid #333;">${budget || 'No especificado'}</td>
                        </tr>
                        <tr>
                        <td style="color:#ff00ff; font-weight:bold; border-bottom:1px solid #333;">Timeline:</td>
                        <td style="border-bottom:1px solid #333;">${timeline || 'No especificado'}</td>
                        </tr>
                        <tr>
                        <td style="color:#ff00ff; font-weight:bold;">Newsletter:</td>
                        <td>${newsletter ? 'Sí' : 'No'}</td>
                        </tr>
                    </table>
                    </td>
                </tr>
                
                <!-- Mensaje -->
                <tr>
                    <td style="padding-top:20px; border-top:2px solid #333;">
                    <h3 style="margin:0 0 10px 0; color:#00ff9f; font-size:18px;">Mensaje:</h3>
                    <p style="margin:0; line-height:1.5;">${message}</p>
                    </td>
                </tr>
                
                <!-- Botón de acción -->
                <tr>
                    <td align="center" style="padding-top:25px;">
                    <a href="#" style="
                        display:inline-block; padding:12px 25px; 
                        background-color:#5200ff; color:#ffffff; 
                        text-decoration:none; font-weight:bold; 
                        border-radius:6px; box-shadow: 0 0 10px rgba(82,0,255,0.5);
                    ">
                        ▶ Revisar mensaje
                    </a>
                    </td>
                </tr>
                </table>
            </td>
            </tr>
        </table>
        </body>
        </html>
      `,
    }

    // Enviar el email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email enviado exitosamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error enviando email:', error)
    return NextResponse.json(
      { message: 'Error al enviar el email' },
      { status: 500 }
    )
  }
} 