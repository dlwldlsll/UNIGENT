'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Home, Search, X, ChevronDown, ChevronRight } from 'lucide-react';

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 10l5 5 5-5H7z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 17l5-5-5-5v10z" />
  </svg>
);


const MyPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>('개발/IT');

  const categories = [
    {
      name: '개발/IT',
      subCategories: [
        '프론트엔드 개발',
        '백엔드 개발',
        '모바일 앱 개발',
        '데이터 분석/AI',
        '클라우드/DevOps',
        '게임 개발',
        '정보 보안',
        '임베디드 개발',
      ],
    },
    { name: '디자인/UX', subCategories: [] },
    { name: '마케팅/광고', subCategories: [] },
    { name: '경영/사무', subCategories: [] },
    { name: '교육/강의', subCategories: [] },
    { name: '연구/R&D', subCategories: [] },
    { name: '서비스/영업', subCategories: [] },
  ];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FF]">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-600">UNIGENT</a>
          <nav className="hidden md:flex items-center space-x-8 text-gray-600">
            <a href="/my-page" className="font-bold text-blue-600">마이페이지</a>
            <a href="#" className="hover:text-blue-600">프로그램</a>
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
                  href="#"
                  className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  회원 정보
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-blue-600 font-bold bg-blue-50 rounded-md"
                >
                  커리어 설정
                </a>
                <a
                  href="#"
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
                    <span>홈 &gt; 마이페이지 &gt; 커리어 설정</span>
                </div>
                <h1 className="text-3xl font-bold mt-2">커리어 설정</h1>
            </div>
            
            <Card>
              <CardContent className="p-8 space-y-10">
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">희망 직무 선택 <span className="text-sm text-gray-500 font-normal">최대 3개 선택 가능</span></h3>
                  <div className="p-4 border rounded-md min-h-[100px]">
                    <p className="text-sm text-gray-600 mb-2">선택한 직무 :</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-gray-200 text-gray-800">
                        백엔드 개발
                        <Button variant="ghost" size="icon" className="h-4 w-4 ml-1">
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-200 text-gray-800">
                        프론트엔드 개발
                        <Button variant="ghost" size="icon" className="h-4 w-4 ml-1">
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">직무 카테고리</h3>
                  <div className="space-y-4">
                      <div className="flex flex-wrap gap-3">
                         {categories.map((category) => (
                            <Button
                                key={category.name}
                                variant="ghost"
                                onClick={() => handleCategoryClick(category.name)}
                                className={`flex items-center gap-1 text-sm font-semibold p-2 rounded-full px-4 ${activeCategory === category.name ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                            >
                                {activeCategory === category.name ? <ChevronDownIcon /> : <ChevronRightIcon />}
                                {category.name}
                            </Button>
                        ))}
                      </div>
                      
                      {activeCategory && (
                        <div className='pt-4'>
                            <div className='flex flex-wrap gap-2'>
                                {categories.find(c => c.name === activeCategory)?.subCategories.map(sub => (
                                    <Badge key={sub} className="bg-blue-100 text-blue-700 font-normal py-2 px-4 rounded-md cursor-pointer hover:bg-blue-200">
                                        {sub}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                      )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">희망 회사 선택 <span className="text-sm text-gray-500 font-normal">최대 3개 선택 가능</span></h3>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input placeholder="Search..." className="pl-10 bg-gray-100" />
                    <X className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" />
                  </div>
                  <div className="p-4 border rounded-md min-h-[100px]">
                    <p className="text-sm text-gray-600">선택한 회사 :</p>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPage;
