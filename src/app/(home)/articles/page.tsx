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
import { MoreHorizontal, Trash } from 'lucide-react';
import {
  Credenza,
  CredenzaContent,
  CredenzaTrigger,
} from "@/components/complex/credenza"
import { DeleteForm } from './components/delete-form';

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany();

  return (
    <Card className='h-[50vh] py-10 md:px-20'>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4 mr-4">Articles</h2>
      <CardContent>
      {articles.length === 0 ? (
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight w-full text-center">
        Currently there are no articles
      </h4>
    ) : (

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
              <TableCell className='max-w-[100px] truncate'>
                {article.description}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {article.pdfUrl && (
                  <a href={article.pdfUrl} target='_blank' rel="noopener noreferrer">
                    View
                  </a>
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {formatDate(article.createdAt)}
              </TableCell>
              <TableCell>
                <Credenza>
                  <CredenzaTrigger asChild>
                    <Button variant={'destructive'}>
                      <Trash />
                    </Button>
                  </CredenzaTrigger>
                  <CredenzaContent>
                    <DeleteForm articleId={article.id} />
                  </CredenzaContent>
                </Credenza>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      )}
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
