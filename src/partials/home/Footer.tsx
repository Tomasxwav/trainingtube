import { Film } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contacto" className="bg-background/5 text-foreground py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <Film className="h-5 w-5 text-foreground" />
              </div>
              <span className="text-xl font-bold">TrainTube</span>
            </div>
            <p className="text-dark-400">
              Plataforma líder en capacitación empresarial por departamentos.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-dark-200">Producto</h3>
            <ul className="space-y-2 text-dark-400">
              <li><a href="#" className="hover:text-foreground transition-colors">Características</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Precios</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Seguridad</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Integraciones</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-dark-200">Empresa</h3>
            <ul className="space-y-2 text-dark-400">
              <li><a href="#" className="hover:text-foreground transition-colors">Acerca de</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Casos de éxito</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Carreras</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Prensa</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-dark-200">Soporte</h3>
            <ul className="space-y-2 text-dark-400">
              <li><a href="#" className="hover:text-foreground transition-colors">Centro de ayuda</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Documentación</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-dark-400 text-sm">
            © 2024 TrainTube. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-dark-400 text-sm mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-foreground transition-colors">Términos de Servicio</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
