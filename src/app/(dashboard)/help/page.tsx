import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Mail, MessageCircle, Phone } from 'lucide-react';

export default function Help() {
 const contactMethods = [
    {
      icon: MessageCircle,
      title: "Chat en vivo",
      description: "Habla con nuestro equipo de soporte",
      action: "Iniciar chat",
      available: "24/7",
      color: "text-green-600"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Envíanos un mensaje detallado",
      action: "Escribir email",
      available: "Respuesta en 24h",
      color: "text-blue-600"
    },
    {
      icon: Phone,
      title: "Teléfono",
      description: "Llama a nuestro centro de ayuda",
      action: "Ver números",
      available: "Lun-Vie 9AM-6PM",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">¿Necesitas más ayuda?</h2>
        <p className="text-muted-foreground">Nuestro equipo está aquí para ayudarte</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {contactMethods.map((method, index) => (
          <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <method.icon className={`h-6 w-6 ${method.color}`} />
              </div>
            </div>
            <h3 className="font-semibold text-foreground">{method.title}</h3>
            <p className="text-sm text-muted-foreground">{method.description}</p>
            <div className="flex items-center justify-center text-xs text-muted-foreground mb-4">
              <Clock className="h-3 w-3 mr-1" />
              {method.available}
            </div>
            <Button variant="outline" className="w-full" disabled>
              {method.action}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
