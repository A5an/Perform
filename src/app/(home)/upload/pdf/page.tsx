'use client';

import { UploadNewsForm } from './components/upload-news-form';
import { TrialApplicationForm } from './components/trial-form';

export default function TrialForms() {
  return (
    <div className='max-w-6xl mx-auto'>
      <main className='container gap-8 px-4 py-12 md:px-6 lg:py-16 mt-16'>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Write Article For The News On Home Page
        </h1>
        <div>
          <div>
            <UploadNewsForm />
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-12">
              Physician Clinical Trial Application
            </h1>
            <TrialApplicationForm />
          </div>
          <div></div>
        </div>
      </main>
    </div>
  );
}