const testimonials = [
  {
    name: "María González",
    role: "Product Manager",
    company: "TechCorp",
    content:
      "Luis Miguel entregó un producto excepcional que superó nuestras expectativas. Su atención al detalle y capacidad técnica son impresionantes.",
    avatar: "👩‍💼",
  },
  {
    name: "Carlos Rodríguez",
    role: "CTO",
    company: "StartupXYZ",
    content:
      "Trabajar con Luis Miguel fue una experiencia fantástica. Su conocimiento técnico y profesionalismo hicieron que el proyecto fuera un éxito total.",
    avatar: "👨‍💻",
  },
  {
    name: "Ana Martínez",
    role: "Lead Developer",
    company: "DevStudio",
    content:
      "La calidad del código y la arquitectura propuesta por Luis Miguel son de primer nivel. Definitivamente recomendaría sus servicios.",
    avatar: "👩‍💻",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-6 relative bg-cyber-darker">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-cyber-lime">Testimonios</h2>
          <div className="h-1 w-24 bg-cyber-purple mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-cyber-gray/60 backdrop-blur-sm border border-cyber-lime/50 rounded-lg p-6 shadow-cyber-card hover:shadow-neon-lime transition-all duration-300 relative"
            >
              {/* Quote decoration */}
              <div className="absolute -top-2 -left-2 text-4xl text-cyber-lime opacity-50">"</div>

              <div className="mb-6">
                <p className="text-gray-200 italic leading-relaxed">{testimonial.content}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyber-lime to-cyber-blue flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-cyber-lime">{testimonial.role}</p>
                  <p className="text-xs text-gray-300">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
