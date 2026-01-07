# Configuración de EmailJS para el Formulario de Contacto

## ¿Por qué EmailJS?

No es posible enviar correos directamente desde el frontend sin un servicio backend o un servicio de terceros. EmailJS es un servicio gratuito que permite enviar correos desde el frontend sin necesidad de un backend propio.

## Pasos para Configurar EmailJS

### 1. Crear una cuenta en EmailJS
1. Ve a https://www.emailjs.com/
2. Crea una cuenta gratuita (permite hasta 200 emails/mes en el plan gratuito)
   - **Importante:** Puedes registrarte con cualquier correo (personal o de trabajo). El correo de registro es solo para tu cuenta de EmailJS.
   - El correo que realmente enviará los mensajes es el que conectes como servicio de email en el paso 2.

### 2. Configurar un servicio de email
1. En el dashboard de EmailJS, ve a **Email Services**
2. Haz clic en **Add New Service**
3. Selecciona **Gmail** (o tu proveedor de email)
4. Conecta tu cuenta de email de negocio: **Tenorioairconditioning24@gmail.com**
   - Este es el correo que enviará los mensajes del formulario
   - EmailJS te pedirá autorizar el acceso a esta cuenta de Gmail
5. Guarda el **Service ID** que se te proporciona

### 3. Crear una plantilla de email
1. Ve a **Email Templates** en el dashboard
2. Haz clic en **Create New Template**
3. Configura la plantilla con las siguientes variables:
   - `{{from_name}}` - Nombre completo del cliente
   - `{{from_email}}` - Email del cliente
   - `{{phone}}` - Teléfono del cliente
   - `{{message}}` - Mensaje del cliente
   - `{{to_email}}` - Email de destino (Tenorioairconditioning24@gmail.com)

Ejemplo de plantilla:
```
Subject: Nuevo contacto desde el sitio web

Nombre: {{from_name}}
Email: {{from_email}}
Teléfono: {{phone}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto del sitio web.
```

4. Guarda el **Template ID**

### 4. Obtener tu Public Key
1. Ve a **Account** > **General**
2. Copia tu **Public Key**

### 5. Configurar el código
Una vez que tengas los tres valores:
- **Service ID**
- **Template ID**
- **Public Key**

Reemplázalos en el archivo `src/App.jsx` en las líneas donde dice:
```javascript
const serviceId = 'YOUR_SERVICE_ID'; // Reemplaza con tu Service ID
const templateId = 'YOUR_TEMPLATE_ID'; // Reemplaza con tu Template ID
const publicKey = 'YOUR_PUBLIC_KEY'; // Reemplaza con tu Public Key
```

## Alternativas a EmailJS

Si prefieres otra solución, puedes usar:
- **Formspree** - https://formspree.io/
- **Netlify Forms** - Si despliegas en Netlify
- **Backend propio** - Con Node.js y nodemailer, o cualquier otro servicio

## Notas Importantes

- **Correo de registro vs Correo de servicio:**
  - El correo con el que te registras en EmailJS puede ser cualquier correo (personal está bien)
  - El correo que conectas como "Email Service" (Tenorioairconditioning24@gmail.com) es el que enviará los mensajes
  - Puedes tener múltiples servicios de email conectados en una sola cuenta de EmailJS
  
- El plan gratuito de EmailJS permite 200 emails/mes
- Los emails se enviarán desde Tenorioairconditioning24@gmail.com a Tenorioairconditioning24@gmail.com (o al correo que configures en la plantilla)
- El formulario incluye validación básica de campos y formato de email
- Los usuarios verán un mensaje de confirmación cuando el formulario se envíe exitosamente

