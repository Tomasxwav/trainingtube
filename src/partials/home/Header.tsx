import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="border-b bg-background text-foreground backdrop-blur supports-[backdrop-filter]:bg-background  sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-primary p-2 rounded-lg">
            <Film className="h-6 w-6 text-foreground" />
          </div>
          <span className="text-xl font-bold ">TrainTube</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#caracteristicas" >
            <Button className=" transition-colors cursor-pointer" variant={"ghost"}>
              Características
            </Button>
          </Link>
          <Link href="#roles" >
            <Button className=" transition-colors cursor-pointer" variant={"ghost"}>
              Roles
            </Button>
          </Link>
          <Link href="#contacto" >
            <Button className=" transition-colors cursor-pointer" variant={"ghost"}>
              Contacto
            </Button>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/login" >
            <Button variant="ghost" className="hidden sm:inline-flex cursor-pointer">
              Iniciar Sesión
            </Button>
          </Link>
          <Button className="bg-primary cursor-pointer text-foreground transition-colors"> 
            Solicitar Demo
          </Button>
        </div>
      </div>
    </header>
  );
};