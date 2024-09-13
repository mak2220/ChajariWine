import nodemailer from 'nodemailer';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, phone, message } = req.body; // Incluye 'phone'

    // Configurar el transportador con Outlook
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // Asegúrate de que sea false para el puerto 587
      auth: {
        user: process.env.OUTLOOK_USER, // tu correo de Outlook
        pass: process.env.OUTLOOK_PASS, // tu contraseña de Outlook
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.OUTLOOK_USER,
      to: process.env.OUTLOOK_USER,
      subject: `Mensaje de contacto de ${name} (${email})`, // Ajusta la estructura del subject
      text: `
        Nombre: ${name}
        Correo: ${email}
        Teléfono: ${phone}
        Mensaje: ${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error al enviar correo:', error.message);
      res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
};

