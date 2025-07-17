'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Employee, Role } from '@/types/employees';
import { employeeSchema, EmployeeFormData } from '@/schema/employees/employeeSchema';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Employee, 'id' | 'createdAt'>) => void;
  employee?: Employee | null;
}

const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
  'Customer Support',
  'Product',
  'Design',
];

export function EmployeeModal({ isOpen, onClose, onSubmit, employee }: EmployeeModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'employee',
      department: '',
    },
  });

  const watchedRole = watch('role');

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name,
        email: employee.email,
        password: '', // Don't pre-fill password for security
        role: employee.role,
        department: employee.department || '',
      });
    } else {
      reset({
        name: '',
        email: '',
        password: '',
        role: 'employee',
        department: '',
      });
    }
  }, [employee, reset]);

  const onFormSubmit = (data: EmployeeFormData) => {
    // Ensure password is provided for new employees, or keep existing for updates
    const submitData = {
      ...data,
      password: data.password || (employee ? employee.password : ''),
      department: data.department || undefined,
    };
    onSubmit(submitData);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </DialogTitle>
          <DialogDescription>
            {employee
              ? 'Update the employee information below.'
              : 'Fill in the details to create a new employee account.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">
              {employee ? 'New Password (leave empty to keep current)' : 'Password'}
            </Label>
            <Input
              id="password"
              type="password"
              {...register('password', {
                required: employee ? false : 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              placeholder={employee ? 'Enter new password (optional)' : 'Enter password'}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label>Role</Label>
            <Select
              value={watchedRole}
              onValueChange={(value: Role) => setValue('role', value)}
            >
              <SelectTrigger>
                <SelectValue>
                  <Badge
                    variant={
                      watchedRole === 'admin'
                        ? 'destructive'
                        : watchedRole === 'supervisor'
                        ? 'default'
                        : 'secondary'
                    }
                    className="capitalize"
                  >
                    {watchedRole}
                  </Badge>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employee">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="capitalize">
                      Employee
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Basic access to training content
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="supervisor">
                  <div className="flex items-center space-x-2">
                    <Badge variant="default" className="capitalize">
                      Supervisor
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Can manage team and content
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive" className="capitalize">
                      Admin
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Full system access
                    </span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label>Department</Label>
            <Select
              value={watch('department')}
              onValueChange={(value) => setValue('department', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Saving...'
                : employee
                ? 'Update Employee'
                : 'Create Employee'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
