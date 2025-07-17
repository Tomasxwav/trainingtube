'use client'

import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Moon, Sun, Globe } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useAuthActions } from '@/actions/useAuthActions';

export default function SettingsPage() {
  const { deleteSession } = useAuthActions();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Apariencia
              </CardTitle>
              <CardDescription>
                Personaliza cómo se ve la plataforma para ti
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Tema</Label>
                  <p className="text-sm text-muted-foreground">
                    Elige entre modo claro u oscuro
                  </p>
                </div>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Claro
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Oscuro
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Sistema
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Cerrar sesión
              </CardTitle>
              <CardDescription>
                Ajustes relacionados con tu cuenta y privacidad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Al cerrar sesión, se cerrará tu sesión en todos los dispositivos.
              </p>
              <Button 
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                onClick={async () => {
                  try {
                    await deleteSession();
                  } catch (error) {
                    console.error('Error al cerrar sesión:', error);
                  }
                }
              }
              >
              
                Cerrar sesión
              </Button>
            </CardContent>
          </Card>

          
    </div>

    </div>

    </div>

)}

