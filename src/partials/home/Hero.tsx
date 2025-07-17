import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Film, ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-tl from-background/50 to-foreground/10 shadow-foreground/20 border border-foreground/10 shadow-2xl">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge variant="secondary" className="w-fit bg-primary/10 text-primary border-primary/20">
              Plataforma de Capacitación Empresarial
            </Badge>
            
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Capacita a tu equipo con 
                <span className="text-primary"> videos especializados</span>
              </h1>
              <p className="text-xl text-dark-400 leading-relaxed">
                TrainTube facilita la gestión de capacitaciones por departamento, 
                permitiendo a supervisores monitorear el progreso y a administradores 
                tener visibilidad completa del desarrollo organizacional.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-lg px-8 text-white">
                Comenzar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Film className="mr-2 h-5 w-5" />
                Ver Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-dark-400">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span>Fácil implementación</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span>Soporte 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span>ROI comprobado</span>
              </div>
            </div>
          </div>

          <div className="lg:pl-8 flex justify-center">
            <div className="relative">
              <div className="bg-card rounded-2xl shadow-foreground/20 border border-foreground/10 shadow-2xl p-8 max-w-md">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary p-2 rounded-lg">
                      <Film className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Dashboard de Capacitación</h3>
                      <p className="text-sm text-dark-400">Gestión centralizada</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <span className="text-sm font-medium">Recursos Humanos</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">85%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <span className="text-sm font-medium">Ventas</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">62%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <span className="text-sm font-medium">IT</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">91%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};