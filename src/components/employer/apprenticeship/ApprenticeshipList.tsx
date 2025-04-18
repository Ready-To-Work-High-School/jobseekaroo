
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash } from 'lucide-react';
import { ApprenticeshipProgram } from '@/types/apprenticeship';

interface ApprenticeshipListProps {
  programs: ApprenticeshipProgram[];
  onEdit: (program: ApprenticeshipProgram) => void;
  onToggleStatus: (programId: string) => void;
  onDelete: (programId: string) => void;
}

export const ApprenticeshipList = ({
  programs,
  onEdit,
  onToggleStatus,
  onDelete
}: ApprenticeshipListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Program</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Compensation</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {programs.map((program) => (
          <TableRow key={program.id}>
            <TableCell>
              <div>
                <div className="font-medium">{program.title}</div>
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {program.description}
                </div>
              </div>
            </TableCell>
            <TableCell>{program.duration}</TableCell>
            <TableCell>{program.startDate}</TableCell>
            <TableCell>{program.compensation}</TableCell>
            <TableCell>
              <Badge variant={program.isActive ? "success" : "secondary"}>
                {program.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onToggleStatus(program.id)}
                >
                  {program.isActive ? 'Deactivate' : 'Activate'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onEdit(program)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-red-500" 
                  onClick={() => onDelete(program.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
