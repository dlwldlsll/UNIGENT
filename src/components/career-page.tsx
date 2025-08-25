'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import Image from 'next/image';

const Header = () => (
  <header className="bg-white shadow-sm">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <a href="/" className="text-2xl font-bold text-blue-600">UNIGENT</a>
      <nav className="hidden md:flex items-center space-x-8 text-gray-600">
        <a href="/my-page" className="hover:text-blue-600">마이페이지</a>
        <a href="/program" className="hover:text-blue-600">프로그램</a>
        <a href="/career" className="text-blue-600 font-bold">진로/취업</a>
        <a href="/curriculum" className="hover:text-blue-600">커리큘럼agent</a>
      </nav>
    </div>
  </header>
);

const JobCard = ({
  logo,
  company,
  title,
  tags,
}: {
  logo: string;
  company: string;
  title: string;
  tags: string[];
}) => (
  <Card className="overflow-hidden">
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 relative">
            <Image src={logo} alt={`${company} logo`} layout="fill" objectFit="contain" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600">{company}</p>
          <h3 className="font-bold mt-1">{title}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span key={tag} className="text-xs text-gray-500">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <Button variant="outline" size="sm">
          지원하기
        </Button>
      </div>
    </CardContent>
  </Card>
);

const CareerPage = () => {
  const jobs = [
    {
      logo: 'https://placehold.co/48x48.png',
      company: '네이버',
      title: '2025 신입 백엔드/프론트엔드 개발자 모집',
      tags: ['프론트엔드', '백엔드'],
    },
    {
      logo: 'https://placehold.co/48x48.png',
      company: '카카오',
      title: '2025 신입/경력 개발자 상시채용',
      tags: ['백엔드', 'ios'],
    },
    {
      logo: 'https://placehold.co/48x48.png',
      company: 'SKT',
      title: 'T-WorX 인턴십',
      tags: ['인턴', '백엔드'],
    },
    {
      logo: 'https://placehold.co/48x48.png',
      company: '삼성',
      title: '2025 3급 신입사원 채용',
      tags: ['프론트엔드', '백엔드'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">진로/취업</h1>
          <p className="text-gray-600 mt-2">
            원하는 직무를 찾아보고, 커리어를 발전시켜 보세요.
          </p>
        </div>

        <Card className="p-6 mb-8 bg-white">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="기업,직무,기술 등 키워드를 입력하세요"
                className="pl-10"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="직무" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">프론트엔드</SelectItem>
                  <SelectItem value="backend">백엔드</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="경력" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">신입</SelectItem>
                  <SelectItem value="experienced">경력</SelectItem>
                  <SelectItem value="intern">인턴</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.title} {...job} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CareerPage;
