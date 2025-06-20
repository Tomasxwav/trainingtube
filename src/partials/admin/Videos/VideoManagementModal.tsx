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
import { useActionState } from 'react';
import { useVideoStore } from '@/stores/videoStore';

interface ChildComponentProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VideoManagementModal({ isOpen, onOpenChange }: ChildComponentProps) {
    const { addVideo } = useVideosActions();
    const { fetchVideos } = useVideoStore()
    
    const [state, action, pending] = useActionState<
        boolean,
        z.infer<typeof videoSchema> 
        >(
        async (prevState, values) => {
            try {
            await addVideo(values);
            return true; 
            } catch {
            return false; 
            }
        },
        false
        );
    const categories = [
        'All',
        'Customer Service',
        'Sales',
        'Marketing',
        'Product',
        'Finance',
        'HR',
        'Support',
        'Engineering',
        'Design',
        'Development',
        'IT',
      ];
    const form = useForm<z.infer<typeof videoSchema>>({
        resolver: zodResolver(videoSchema),
        defaultValues: {
          title: '',
          description: '',
          thumbnail: {} as File,
          video: {} as File,
          category: '',
        },
      })

      function onSubmit(values: z.infer<typeof videoSchema>) {
        console.log('onSubmit', values);
        addVideo(values)
        form.reset();
        fetchVideos()
        onOpenChange(false)
    }
      
    return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="w-full items-center justify-center border-b border-dark-200 pb-4">
          <DialogTitle>Upload tutorial</DialogTitle>
        </DialogHeader>
        <DialogDescription/>
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
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem
                                className="mb-4"
                            >
                            <FormLabel>Categories</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-full mb-4">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent className="h-[300px]">
                                        <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        {categories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <Button disabled={pending} type="submit" variant={'secondary'} className="w-full py-2 px-4 cursor-pointer "> { pending ? 'Uploading...' : "Upload video"} </Button>  

                </form>
            </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}