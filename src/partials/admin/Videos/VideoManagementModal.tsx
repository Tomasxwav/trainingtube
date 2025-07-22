"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { videoSchema } from '@/schema/videos/videoSchema';
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useVideosActions } from '@/actions/useVideosActions';
import { DialogDescription } from '@radix-ui/react-dialog';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useActionState, useTransition } from 'react';
import { useDepartmentStore } from '@/stores/departmentStore';

interface ChildComponentProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onVideoAdded?: () => void;
}

export default function VideoManagementModal({ isOpen, onOpenChange, onVideoAdded }: ChildComponentProps) {
    const { addVideo } = useVideosActions();
    const [isPending, startTransition] = useTransition();
    const { departments } = useDepartmentStore();

    const [state, action, pending] = useActionState<
        boolean,
        z.infer<typeof videoSchema> 
        >(
        async (prevState, values) => {
            try {
            await addVideo({ ...values, department_id: values.department_id }, () => {
              if (onVideoAdded) {
                onVideoAdded();
              }
            });
            return true; 
            } catch {
            return false; 
            }
        },
        false
        );
        
    const form = useForm<z.infer<typeof videoSchema>>({
        resolver: zodResolver(videoSchema),
        defaultValues: {
          title: '',
          description: '',
          thumbnail: {} as File,
          video: {} as File,
          department_id: 0 ,
        },
      })

      function onSubmit(values: z.infer<typeof videoSchema>) {
        console.log('onSubmit', values);
        startTransition(() => {
          action(values);
        });
        form.reset();
        onOpenChange(false)
    }

    const handleOpenChange = (open: boolean) => {
        form.reset();
        onOpenChange(open);
    }
      
    return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            Subir Nuevo Video de Capacitación
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Agrega un nuevo video de capacitación a tu biblioteca. Completa la información requerida a continuación.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium">Título del Video *</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Ingresa un título descriptivo para tu video" 
                                        {...field} 
                                        className="h-10"
                                    />
                                </FormControl>
                                <FormDescription className="text-xs">
                                    Elige un título claro y descriptivo que ayude a los aprendices a entender el contenido.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium">Descripción *</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Proporciona una descripción detallada de lo que los aprendices obtendrán de este video..."
                                    className="resize-none min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="text-xs">
                                Incluye objetivos de aprendizaje, requisitos previos y los temas que se cubren.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="space-y-2">
                                        <FormLabel className="text-sm font-medium">Imagen Miniatura *</FormLabel>
                                        <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => field.onChange(e.target.files?.[0])}
                                                    onBlur={field.onBlur}
                                                    name={field.name}
                                                    ref={field.ref}
                                                    className="h-fit file:h-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 "
                                                />
                                        </FormControl>
                                    </div>
                                    <FormDescription className="text-xs ">
                                        Sube una imagen miniatura atractiva (JPG, PNG). Tamaño recomendado: 1280x720px.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="video"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="space-y-2">
                                        <FormLabel className="text-sm font-medium">Archivo de Video *</FormLabel>
                                        <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={(e) => field.onChange(e.target.files?.[0])}
                                                    onBlur={field.onBlur}
                                                    name={field.name}
                                                    ref={field.ref}
                                                    className="h-fit file:h-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                                />
                                    </FormControl>
                                    </div>
                                    <FormDescription className="text-xs">
                                        Sube tu video de capacitación (MP4, MOV, AVI). Tamaño máximo de archivo: 500MB.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <FormField
                        control={form.control}
                        name="department_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium">Departamento *</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value ? String(field.value) : ""}
                                        onValueChange={(val) => field.onChange(Number(val))}
                                    >
                                        <SelectTrigger className="h-10">
                                            <SelectValue placeholder="Selecciona el departamento objetivo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Departamentos</SelectLabel>
                                                {departments.map((department) => (
                                                    <SelectItem key={department.id} value={String(department.id)}>
                                                        {department.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription className="text-xs">
                                    Elige el departamento al que está dirigido este video de capacitación.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <div className="flex gap-3 pt-4 border-t">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => handleOpenChange(false)}
                            className="flex-1"
                        >
                            Cancelar
                        </Button>
                        <Button 
                            disabled={pending || isPending} 
                            type="submit" 
                            className="flex-1"
                        > 
                            {(pending || isPending) ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Subiendo...
                                </>
                            ) : (
                                "Subir Video"
                            )}
                        </Button>
                    </div>

                </form>
            </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}