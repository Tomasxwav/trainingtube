import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { createColumns } from "./DepartmentsColumns"
import React, { useEffect, useState, useMemo } from "react"
import { Skeleton } from '@/components/ui/skeleton'
import { Department } from '@/types/employees'
import { Building2 } from 'lucide-react'

interface DepartmentsTableProps {
  departments: Department[];
  isLoading: boolean;
  onEdit: (department: Department) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, isActive: boolean, departmentName: string) => void;
}

export default function DepartmentsTable({ departments, isLoading, onEdit, onDelete, onToggle }: DepartmentsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [loading, setLoading] = useState(true)
  const departmentFilter = 'all' 
  const searchTerm = ''

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  const columns = useMemo(() => createColumns({
    onEdit,
    onDelete,
    onToggle
  }), [onEdit, onDelete, onToggle])



  const filteredDepartments = useMemo(() => {
    if (!departments) return []

    return departments.filter((department) => {
      const matchesSearch =
        department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        department.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        departmentFilter === 'all' ||
        department.name.toLowerCase() === departmentFilter

      return matchesSearch && matchesCategory
    })
  }, [departments, searchTerm, departmentFilter])

  const table = useReactTable({
    data: filteredDepartments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  })

  if (loading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader >
            <TableRow >
              <TableHead >
                <Skeleton className="h-4 w-[250px]" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 6 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell colSpan={columns.length} className="text-center">
                <div className="flex items-center space-x-4 py-2 ">
                  <Skeleton className="h-4 w-full rounded-md" />
                </div>
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (( departments.length === 0 || !departments ) && !isLoading) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <Building2 className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron departamentos</h3>
        <p className="text-muted-foreground mb-4">Favor de comunicarse con el administrador.</p>
      </div>
    )
  }

  if (filteredDepartments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">Ningún departamento coincide con tu búsqueda</h3>
        <p className="text-muted-foreground">Intenta ajustar tus términos de búsqueda o filtros.</p>
      </div>
    )
  }


  return (
    <div className="space-y-4">
      

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )} 
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow 
                key={row.id}
                className="hover:bg-muted/50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Mostrando {table.getRowModel().rows.length} de {departments.length} departamentos
          {searchTerm && ` para "${searchTerm}"`}
          {departmentFilter !== 'all' && ` en ${departmentFilter}`}
        </span>
      </div>
    </div>
  )
}
