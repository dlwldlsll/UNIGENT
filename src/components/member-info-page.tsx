'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const MemberInfoPage = () => {
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
                  className="block px-4 py-2 text-blue-600 font-bold bg-blue-50 rounded-md"
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
                  className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
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
                    <span>홈 &gt; 마이페이지 &gt; 회원 정보</span>
                </div>
                <h1 className="text-3xl font-bold mt-2">회원 정보</h1>
            </div>
            
            <Card>
              <CardContent className="p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">기본 정보</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">이름</Label>
                        <Input id="name" defaultValue="홍길동" />
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="studentId">학번</Label>
                        <Input id="studentId" defaultValue="20201234" readOnly />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">학과</Label>
                      <Input id="department" defaultValue="컴퓨터공학과" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일</Label>
                      <Input id="email" type="email" defaultValue="honggildong@sunchon.ac.kr" />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="phone">연락처</Label>
                      <Input id="phone" type="tel" defaultValue="010-1234-5678" />
                    </div>
                  </div>
                </div>
                
                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">비밀번호 변경</h3>
                   <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">현재 비밀번호</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">새 비밀번호</Label>
                        <Input id="new-password" type="password" />
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline">취소</Button>
                    <Button>저장</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemberInfoPage;
