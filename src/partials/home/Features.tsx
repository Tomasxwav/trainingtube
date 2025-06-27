import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, BarChart3, Users, Shield, Play, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Subida de Videos",
    description: "Supervisores pueden subir tutoriales específicos para su departamento de forma sencilla y organizada."
  },
  {
    icon: BarChart3,
    title: "Seguimiento de Progreso",
    description: "Monitorea el avance de cada empleado en tiempo real con métricas detalladas y reportes automáticos."
  },
  {
    icon: Users,
    title: "Gestión por Departamentos",
    description: "Organiza el contenido por departamento con acceso controlado y contenido específico para cada área."
  },
  {
    icon: Shield,
    title: "Control de Acceso",
    description: "Diferentes niveles de permisos para empleados, supervisores y administradores con seguridad empresarial."
  },
  {
    icon: Play,
    title: "Videos Generales",
    description: "Contenido transversal disponible para toda la organización con temas de interés común."
  },
  {
    icon: CheckCircle,
    title: "Certificaciones",
    description: "Sistema de certificaciones automáticas al completar módulos de capacitación específicos."
  }
];

export const Features = () => {
  return (
    <section id="caracteristicas" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground-900 mb-4">
            Características que Impulsan el Crecimiento
          </h2>
          <p className="text-xl text-dark-400 max-w-3xl mx-auto">
            TrainTube ofrece todas las herramientas necesarias para una gestión 
            eficiente de capacitaciones empresariales a gran escala.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-dark-400 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};