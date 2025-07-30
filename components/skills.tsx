const skills = [
  { name: "Angular", level: 90, icon: "🅰️", color: "cyber-purple" },
  { name: "React", level: 85, icon: "⚛️", color: "cyber-blue" },
  { name: "TypeScript", level: 90, icon: "📘", color: "cyber-blue" },
  { name: "JavaScript", level: 88, icon: "🟨", color: "cyber-lime" },
  { name: "Node.js", level: 85, icon: "🟢", color: "cyber-lime" },
  { name: ".NET Core", level: 82, icon: "🔷", color: "cyber-purple" },
  { name: "C#", level: 80, icon: "💜", color: "cyber-purple" },
  { name: "Docker", level: 75, icon: "🐳", color: "cyber-blue" },
  { name: "MySQL", level: 85, icon: "🗄️", color: "cyber-lime" },
  { name: "PostgreSQL", level: 80, icon: "🐘", color: "cyber-blue" },
  { name: "MongoDB", level: 78, icon: "🍃", color: "cyber-lime" },
  { name: "Nest.js", level: 75, icon: "🦅", color: "cyber-purple" },
]

const tools = [
  { name: "Git/GitHub", icon: "🔧" },
  { name: "Postman", icon: "📮" },
  { name: "Scrum", icon: "🔄" },
  { name: "Jira", icon: "📊" },
  { name: "Trello", icon: "📋" },
  { name: "TypeORM", icon: "🔗" },
  { name: "N8n", icon: "🔀" },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 relative bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-cyber-lime">Habilidades & Stack</h2>
          <div className="h-1 w-24 bg-cyber-purple mx-auto" />
        </div>

        {/* Technical Skills */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Tecnologías</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="bg-cyber-gray/60 backdrop-blur-sm border border-cyber-purple/50 rounded-lg p-6 shadow-cyber-card hover:shadow-neon-purple transition-all duration-300 hover:scale-105"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{skill.icon}</div>
                  <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                </div>

                <div className="relative">
                  <div className="w-full bg-cyber-darker rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r from-${skill.color} to-${skill.color}-glow transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-semibold text-${skill.color}`}>{skill.level}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Methodologies */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Herramientas & Metodologías</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4">
            {tools.map((tool, index) => (
              <div
                key={tool.name}
                className="bg-cyber-gray/40 backdrop-blur-sm border border-cyber-lime/30 rounded-lg p-4 shadow-cyber-card hover:shadow-neon-lime transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="text-2xl mb-2">{tool.icon}</div>
                <h4 className="text-sm font-semibold text-white">{tool.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
