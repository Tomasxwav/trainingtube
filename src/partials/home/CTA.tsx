import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 px-4 bg-primary/50 ">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            ¿Listo para Transformar la Capacitación en tu Empresa?
          </h2>
          <p className="text-xl text-dark-700 max-w-2xl mx-auto">
            Únete a empresas líderes que ya están usando TrainTube para 
            mejorar el desarrollo de su talento humano.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-foreground   text-lg px-8">
              Solicitar Demo Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-white hover:text-blue-600 text-lg px-8">
              <Phone className="mr-2 h-5 w-5" />
              Hablar con Ventas
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-dark-300text-sm">
            <span>✓ Implementación en 24 horas</span>
            <span>✓ Soporte especializado</span>
            <span>✓ Sin compromisos</span>
          </div>
        </div>
      </div>
    </section>
  );
};