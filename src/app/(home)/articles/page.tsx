import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { prisma } from '@/lib/prisma';
import { MoreHorizontal } from 'lucide-react';
import {
  Credenza,
  CredenzaContent,
  CredenzaTrigger,
} from "@/components/complex/credenza"
import { DeleteForm } from './components/delete-form';

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany();

  return (
    <Card>
      <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="hidden md:table-cell">
              PDF File
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Created at
            </TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell className="font-medium">
                {article.title}
              </TableCell>
              <TableCell>
                {article.description}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <a href={article.pdfUrl} target='_blank'>View</a>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {formatDate(article.createdAt)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      aria-haspopup="true"
                      size="icon"
                      variant="ghost"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                    <Credenza>
                      <CredenzaTrigger asChild>
                        <button>Delete</button>
                      </CredenzaTrigger>
                      <CredenzaContent>
                        <DeleteForm articleId={article.id} />
                      </CredenzaContent>
                    </Credenza>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </CardContent>
    </Card>
  )
}

function formatDate(date: Date) {
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const postedDate = `Posted on ${formattedDate}`;

  return postedDate;
}
