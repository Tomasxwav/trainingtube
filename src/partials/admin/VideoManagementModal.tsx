"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ChildComponentProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VideoManagementModal({ isOpen, onOpenChange }: ChildComponentProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Este es mi Dialog</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          Contenido del diálogo...
        </div>
      </DialogContent>
    </Dialog>
  );
}