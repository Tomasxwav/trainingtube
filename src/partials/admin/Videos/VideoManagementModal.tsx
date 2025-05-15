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
import { useActionState } from 'react';


interface ChildComponentProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VideoManagementModal({ isOpen, onOpenChange }: ChildComponentProps) {
    const { addVideo } = useVideosActions();

    const form = useForm<z.infer<typeof videoSchema>>({
        resolver: zodResolver(videoSchema),
        defaultValues: {
          title: '',
          description: '',
          thumbnail: {} as File,
          video: {} as File,
        },
      })

      function onSubmit(values: z.infer<typeof videoSchema>) {
        addVideo(values);
      }
      
    return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="w-full items-center justify-center border-b border-dark-200 pb-4">
          <DialogTitle>Upload tutorial</DialogTitle>
        </DialogHeader>
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem 
                                className="mb-4"
                            >
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Insert title" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem 
                                className="mb-4"
                            >
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write a description"
                                    className="resize-none"
                                    {...field}
                                    />
                            </FormControl>
                            {/* <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field }) => (
                            <FormItem 
                                className="mb-4"
                            >
                            <FormLabel>Thumbnail</FormLabel>
                            <FormControl>
                                <Input
                                    type='file'
                                    placeholder=""
                                    onChange={(e) => field.onChange(e.target.files?.[0])}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                />
                            </FormControl>
                            {/* <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="video"
                        render={({ field }) => (
                            <FormItem 
                                className="mb-4"
                            >
                            <FormLabel>Video</FormLabel>
                            <FormControl>
                                <Input
                                    type='file'
                                    placeholder=""
                                    onChange={(e) => field.onChange(e.target.files?.[0])}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                />
                            </FormControl>
                            {/* <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <Button type="submit" variant={'secondary'} className="w-full py-2 px-4 cursor-pointer "> Upload </Button> 

                </form>
            </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}