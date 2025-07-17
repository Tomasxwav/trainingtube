
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, User } from "lucide-react";

const roles = [
  {
    icon: User,
    title: "Empleados",
    description: "Acceso a videos de capacitación de su departamento y contenido general",
    features: [
      "Ver videos asignados",
      "Seguimiento de progreso personal",
      "Certificaciones automáticas",
      "Acceso a contenido general"
    ],
    color: "bg-green-50 text-green-600"
  },
  {
    icon: Users,
    title: "Supervisores",
    description: "Gestión completa de su departamento y creación de contenido",
    features: [
      "Subir nuevos videos",
      "Crear y gestionar empleados",
      "Monitorear progreso del equipo",
      "Reportes departamentales"
    ],
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: Shield,
    title: "Administradores",
    description: "Control total de la plataforma y visibilidad organizacional",
    features: [
      "Gestión de todos los departamentos",
      "Reportes organizacionales",
      "Administración de usuarios",
      "Configuración del sistema"
    ],
    color: "bg-purple-50 text-purple-600"
  }
];

export const Roles = () => {
  return (
    <section id="roles" className="py-20 px-4 bg-accent">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Roles y Permisos Definidos
          </h2>
          <p className="text-xl text-dark max-w-3xl mx-auto">
            Cada usuario tiene acceso específico según su rol en la organización, 
            garantizando seguridad y eficiencia en la gestión de capacitaciones.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="pb-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${role.color}`}>
                  <role.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl text-foreground">{role.title}</CardTitle>
                <CardDescription className="text-dark-400 text-base">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {role.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-dark-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
