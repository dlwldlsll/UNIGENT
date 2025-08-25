'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const portfolioData = {
  courses: [
    { type: '학교 강의', name: '데이터 과학 이해', institution: '국립순천대학교', date: '2023년 2학기' },
    { type: '학교 강의', name: 'C 프로그래밍', institution: '국립순천대학교', date: '2024년 1학기' },
    { type: '학교 강의', name: '멀티미디어 콘텐츠', institution: '국립순천대학교', date: '2024년 1학기' },
    { type: '특강', name: '디지털 전환 시대의 인공지능 트렌드', institution: '한국정보화진흥원', date: '2024.03.21' },
  ],
};

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-[#F7F9FF]">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-600">UNIGENT</a>
          <nav className="hidden md:flex items-center space-x-8 text-gray-600">
            <a href="/my-page" className="font-bold text-blue-600">마이페이지</a>
            <a href="/program" className="hover:text-blue-600">프로그램</a>
            <a href="/career" className="hover:text-blue-600">진로/취업</a>
            <a href="/curriculum" className="hover:text-blue-600">커리큘럼agent</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <Card className="p-4">
              <h2 className="text-xl font-bold mb-4 p-2">마이페이지</h2>
              <nav className="space-y-1">
                <a
                  href="/member-info"
                  className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  회원 정보
                </a>
                <a
                  href="/my-page"
                  className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  커리어 설정
                </a>
                <a
                  href="/portfolio"
                  className="block px-4 py-2 text-blue-600 font-bold bg-blue-50 rounded-md"
                >
                  포트폴리오
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  자소서/이력서
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  고객센터
                </a>
              </nav>
            </Card>
          </aside>

          <div className="md:col-span-3">
            <div className="mb-4">
                <div className="flex items-center text-sm text-gray-500">
                    <Home className="w-4 h-4 mr-1.5" />
                    <span>홈 &gt; 마이페이지 &gt; 포트폴리오</span>
                </div>
                <h1 className="text-3xl font-bold mt-2">포트폴리오</h1>
            </div>
            
            <Card>
              <CardContent className="p-8 space-y-10">
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold">수강 강의</h3>
                    <Button variant="outline" size="sm">수정하기</Button>
                  </div>
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>구분</TableHead>
                          <TableHead>강의명</TableHead>
                          <TableHead>기관/학교</TableHead>
                          <TableHead>기간/날짜</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {portfolioData.courses.map((course, index) => (
                          <TableRow key={index}>
                            <TableCell>{course.type}</TableCell>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.institution}</TableCell>
                            <TableCell>{course.date}</TableCell>
                          </TableRow>
                        ))}
                         <TableRow>
                            <TableCell>--</TableCell>
                            <TableCell>--</TableCell>
                            <TableCell>--</TableCell>
                            <TableCell>--</TableCell>
                          </TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">자격증 업로드</h3>
                  <Card className="h-64 flex flex-col items-center justify-center text-center text-gray-500">
                      <Search className="w-12 h-12 mb-4 text-gray-400" />
                      <p className="font-semibold">자격증을 검색하세요</p>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioPage;
