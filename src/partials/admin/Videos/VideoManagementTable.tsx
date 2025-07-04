import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
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

import React, { useEffect, useState } from "react"
import { Video } from '@/types/videos'

export default function VideoManagementTable() {
  const { getAllVideos } = useVideosActions()
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    getAllVideos().then((data: Video[]) => setVideos(data || []))
  }, [getAllVideos])

  interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

  const table = useReactTable({
    data: videos || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table className="border-b border-dark-50 hover:bg-dark-50 transition-colors">
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
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}