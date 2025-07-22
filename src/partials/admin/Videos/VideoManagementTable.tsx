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

import { columns } from "./VideoManagementColumns"
import { useVideosActions } from '@/actions/useVideosActions'

import React, { useEffect, useState, useMemo } from "react"
import { Video } from '@/types/videos'
import { Skeleton } from '@/components/ui/skeleton'

interface VideoManagementTableProps {
  searchTerm: string;
  departmentFilter: string;
  refreshTrigger?: number; 
}

export default function VideoManagementTable({ searchTerm, departmentFilter, refreshTrigger }: VideoManagementTableProps) {
  const { getAllVideos } = useVideosActions()
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [sorting, setSorting] = useState<SortingState>([])

  useEffect(() => {
    setLoading(true)
    getAllVideos()
      .then((data: Video[]) => {
        setVideos(data || [])
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      setLoading(true)
      getAllVideos()
        .then((data: Video[]) => {
          setVideos(data || [])
        })
        .finally(() => setLoading(false))
    }
  }, [refreshTrigger])

  const filteredVideos = useMemo(() => {
    if (!videos) return []
    
    return videos.filter((video) => {
      const matchesSearch = 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.department.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = 
        departmentFilter === 'all' || 
        video.department.name.toLowerCase() === departmentFilter.toLowerCase()
      
      return matchesSearch && matchesCategory
    })
  }, [videos, searchTerm, departmentFilter])

  const table = useReactTable({
    data: filteredVideos,
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
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-16 w-24 rounded" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        ))}
      </div>
    )
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron videos</h3>
        <p className="text-muted-foreground mb-4">Comienza subiendo tu primer video de capacitación.</p>
      </div>
    )
  }

  if (filteredVideos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">Ningún video coincide con tu búsqueda</h3>
        <p className="text-muted-foreground">Intenta ajustar tus términos de búsqueda o filtros.</p>
      </div>
    )
  }


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Mostrando {table.getRowModel().rows.length} de {videos.length} videos
          {searchTerm && ` para "${searchTerm}"`}
          {departmentFilter !== 'all' && ` en ${departmentFilter}`}
        </span>
      </div>

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
    </div>
  )
}
