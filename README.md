# 🚀 Portfolio 2025 - Luis Miguel Alfonzo Roca

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> **Portfolio profesional con diseño cyberpunk y funcionalidades avanzadas** - Desarrollador Full Stack con más de 5 años de experiencia

## 📊 Estado del Proyecto

![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

## ✨ Características

### 🎨 **Diseño & UX**
- **Tema Cyberpunk** con efectos neon y animaciones fluidas
- **Diseño responsive** optimizado para todos los dispositivos
- **Modo oscuro** con paleta de colores cyber
- **Animaciones CSS** personalizadas y transiciones suaves
- **Patrón de circuitos** sutil en el fondo

### 🌐 **Internacionalización**
- **Soporte multiidioma** (Español/Inglés)
- **Context API** para gestión de idiomas
- **Traducciones completas** de toda la interfaz
- **Cambio dinámico** de idioma sin recarga

### 📊 **Funcionalidades Dinámicas**
- **Repositorios de GitHub** en tiempo real
- **Formulario de contacto** funcional con envío de emails
- **CV descargable** en múltiples idiomas
- **Testimonios** interactivos
- **Proyectos destacados** con enlaces directos

### 🛠 **Stack Tecnológico**
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS con configuración personalizada
- **UI Components**: Radix UI + shadcn/ui
- **Backend**: Next.js API Routes
- **Email**: Nodemailer con templates HTML personalizados
- **Deployment**: Optimizado para Vercel

## 🚀 Demo

**🌐 [Ver Portfolio en Vivo](https://tu-portfolio.vercel.app)**

> ⚠️ **Nota**: Actualiza la URL del demo con tu dominio real una vez que hagas el deployment.

## 📸 Capturas de Pantalla

### 🏠 Página Principal
![Hero Section](public/Screenshot%202025-07-31%20190203.png)

### 📱 Diseño Responsive
![Mobile View](public/Screenshot%202025-07-31%20230859.png)

## 🛠 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm, yarn o pnpm

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/LuisRocca/Porfolio-2025.git
cd Porfolio-2025
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env.local
cp .env.example .env.local
```

```env
# Configuración de Email
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-de-aplicación

# Configuración de GitHub (opcional)
GITHUB_TOKEN=tu-token-de-github
GITHUB_USERNAME=tu-username
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
Porfolio_2025/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── contact/       # Endpoint de contacto
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes UI (shadcn/ui)
│   ├── about.tsx         # Sección Sobre Mí
│   ├── contact.tsx       # Formulario de contacto
│   ├── experience.tsx    # Experiencia laboral
│   ├── footer.tsx        # Footer
│   ├── hero.tsx          # Hero section
│   ├── navbar.tsx        # Navegación
│   ├── projects.tsx      # Proyectos destacados
│   ├── repositories.tsx  # Repositorios GitHub
│   ├── skills.tsx        # Habilidades técnicas
│   └── testimonials.tsx  # Testimonios
├── contexts/             # Contextos React
│   └── language-context.tsx  # Contexto de idiomas
├── hooks/                # Custom hooks
├── lib/                  # Utilidades
├── public/               # Archivos estáticos
│   ├── CvLuisMiguelAlfonzoRocaDevES.pdf
│   ├── CvLuisMiguelAlfonzoRocaDevIN.pdf
│   └── Screenshots/
└── styles/               # Estilos adicionales
```

## 🎯 Funcionalidades Principales

### 🌐 **Sistema de Idiomas**
- Context API para gestión de estado
- Traducciones completas en español e inglés
- Cambio dinámico sin recarga de página
- Persistencia de preferencia de idioma

### 📧 **Sistema de Contacto**
- Formulario completo con validación
- Envío de emails con Nodemailer
- Template HTML personalizado con tema cyberpunk
- Campos: nombre, email, teléfono, empresa, tipo de proyecto, presupuesto, timeline, mensaje

### 🔗 **Integración con GitHub**
- API de GitHub para repositorios en tiempo real
- Mapeo automático de datos (stars, forks, lenguaje)
- Enlaces directos a repositorios
- Colores dinámicos por lenguaje de programación

### 📱 **Responsive Design**
- Mobile-first approach
- Breakpoints optimizados
- Navegación adaptativa
- Componentes flexibles

## 🎨 Personalización

### Colores Cyberpunk
```css
/* Paleta de colores personalizada */
cyber-purple: #a855f7
cyber-lime: #84cc16
cyber-blue: #3b82f6
cyber-gray: #1a1a1a
cyber-darker: #0a0a0a
```

### Animaciones
- Efectos neon con `box-shadow`
- Transiciones suaves con `transition-all`
- Animaciones CSS personalizadas
- Hover effects interactivos

## 🚀 Deployment

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Deploy automático en cada push

### Variables de Entorno para Producción
```env
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-de-aplicación
GITHUB_TOKEN=tu-token-de-github
GITHUB_USERNAME=tu-username
```

## 📊 Scripts Disponibles

```json
{
  "dev": "next dev",           # Desarrollo local
  "build": "next build",       # Build de producción
  "start": "next start",       # Servidor de producción
  "lint": "next lint"          # Linting
}
```

## 🔧 Configuración Avanzada

### Tailwind CSS
- Configuración personalizada con colores cyberpunk
- Animaciones y keyframes personalizados
- Sistema de sombras neon
- Fuentes optimizadas

### Next.js
- App Router para mejor rendimiento
- API Routes para backend
- Optimización de imágenes
- SEO optimizado

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Luis Miguel Alfonzo Roca**
- 🌐 [Portfolio](https://tu-portfolio.vercel.app)
- 💼 [LinkedIn](https://linkedin.com/in/tu-perfil)
- 🐙 [GitHub](https://github.com/LuisRocca)
- 📧 [Email](mailto:luis.rocca96@gmail.com)

> 💡 **Consejo**: Actualiza los enlaces de redes sociales con tus perfiles reales.

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Radix UI](https://www.radix-ui.com/) - Componentes accesibles
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Lucide React](https://lucide.dev/) - Iconos
- [Vercel](https://vercel.com/) - Hosting y deployment

---

⭐ **Si te gusta este proyecto, ¡dale una estrella!** 