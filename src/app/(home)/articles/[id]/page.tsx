import { prisma } from '@/lib/prisma';

export default async function Article({ params }: { params: { id: string } }) {
  const article = await prisma.article.findFirst({
    where: {
      id: params.id,
    }
  });

  if (!article) {
    return (
      <div>
        <div className='max-w-6xl mx-auto'>
          <main className="container mx-auto py-12 md:px-6 lg:py-16 mt-24">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
              Article Not Found
            </h1>
          </main>
        </div>
      </div>
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

  return (
    <div>
      <div className='max-w-6xl mx-auto'>
        <main className="container mx-auto py-12 md:px-6 lg:py-16">
          <p className="text-center text-lg mt-4">{formatDate(article.createdAt)}</p>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
            {article.title}
          </h1>
          <p className="text-center text-lg mt-4">{article.description}</p>

        {article.pdfUrl && (
        <iframe src={article.pdfUrl}
          style={{width: "100%", height: "600px", marginTop: "32px"}} frameBorder="0" />
        )}
        </main>
      </div>
    </div>
  )
}