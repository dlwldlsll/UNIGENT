'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Bookmark, Bell } from 'lucide-react';

const Header = () => (
  <header className="bg-white shadow-sm">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <a href="/" className="text-2xl font-bold text-blue-600">UNIGENT</a>
      <nav className="hidden md:flex items-center space-x-8 text-gray-600">
        <a href="/my-page" className="hover:text-blue-600">마이페이지</a>
        <a href="/program" className="text-blue-600 font-bold">프로그램</a>
        <a href="/career" className="hover:text-blue-600">진로/취업</a>
        <a href="/curriculum" className="hover:text-blue-600">커리큘럼agent</a>
      </nav>
    </div>
  </header>
);

const CertificationCard = ({
  title,
  tags,
  examDate,
  applicationPeriod,
  description,
}: {
  title: string;
  tags: string[];
  examDate: string;
  applicationPeriod: string;
  description: string;
}) => (
  <Card className="bg-white rounded-lg shadow-sm w-full">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-600 font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          <Bookmark className="w-5 h-5 cursor-pointer hover:fill-current" />
          <Bell className="w-5 h-5 cursor-pointer hover:fill-current" />
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <p className="text-4xl font-bold tracking-tighter mb-4">{examDate}</p>
        <hr />
        <div className="mt-4 space-y-3 text-sm">
          <div>
            <p className="font-semibold">접수 기간</p>
            <p className="text-gray-600">{applicationPeriod}</p>
          </div>
          <div>
            <a href="#" className="font-semibold underline">접수 하러 가기</a>
          </div>
          <div>
            <a href="#" className="font-semibold underline">고사장 정보 바로가기</a>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <p className="font-bold text-blue-600">이런 분에게 적합해요!</p>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </CardContent>
  </Card>
);

const ProgramPage = () => {
  const certifications = [
    {
      title: 'TOPCIT',
      tags: ['소프트웨어 자격증', '국가자격 시험'],
      examDate: '25.05.24',
      applicationPeriod: '25.04.14(월) 09:00 ~ 25.04.25(금) 18:00',
      description: '공기업, 공무원, IT 직무에 취직 하고싶은 분',
    },
    {
      title: 'SQLD',
      tags: ['데이터 분석 자격증', '국가자격 시험'],
      examDate: '25.06.09',
      applicationPeriod: '25.04.27(일) 02:00 ~ 25.05.01(목) 10:00',
      description: '데이터 분석가, DB관리자 직무를 원하시는 분',
    },
    {
      title: '정보보안기사',
      tags: ['정보보호', '국가자격 시험'],
      examDate: '25.05.24',
      applicationPeriod: '25.02.04(월) ~ 25.02.7(금)',
      description: '보안 관련 직무에 취직 하고 싶은 분',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FF]">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">나에게 필요한 안성맞춤 자격증 시험</h1>
        <hr className="mb-10"/>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <CertificationCard key={cert.title} {...cert} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProgramPage;
