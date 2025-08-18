'use client';

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const Header = () => (
  <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">UNIGENT</h1>
      <div className="flex items-center space-x-8">
        <nav className="hidden md:flex items-center space-x-8 text-gray-600">
          <a href="#" className="font-bold text-gray-800">마이페이지</a>
          <a href="#" className="hover:text-blue-600">프로그램</a>
          <a href="#" className="hover:text-blue-600">진로/취업</a>
          <a href="/curriculum" className="hover:text-blue-600">커리큘럼agent</a>
        </nav>
        <button className="text-gray-500 hover:text-gray-700">
          <Bell />
        </button>
      </div>
    </div>
  </header>
);

const Calendar = () => {
    const today = 16;
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const firstDayOffset = 3; // Start day of the month (Wednesday)
    const calendarDays = Array(firstDayOffset).fill(null).concat(days);
    
    const events = [4, 5, 11, 12, 18, 19, 25, 26];

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="text-xl font-bold">5월 <span className="text-gray-500 font-medium">2025년</span></span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2">
                    {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                        <div key={day} className={day === '일' ? 'text-red-500' : (day === '토' ? 'text-blue-500' : '')}>{day}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 text-center text-sm">
                    {calendarDays.map((day, index) => (
                        <div key={index} className="py-1 relative">
                            {day && (
                                <span className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${day === today ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'} ${index % 7 === 0 ? 'text-red-500' : ''}`}>
                                    {day}
                                </span>
                            )}
                             {day && events.includes(day) && (
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};


const ProgramSchedule = () => {
    const schedules = [
        { title: '{대기업}2025 합동 채용 설명회', date: '2025.05.13~2025.05.27' },
        { title: '장학금 최대 60만원 지급!! 대기업 취...', date: '2025.05.14~2025.05.31' },
        { title: '정보처리기사 필기특강(3주 단기 특강)', date: '2025.05.15~2025.05.23' }
    ];

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg">프로그램 일정</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {schedules.map((item, index) => (
                        <div key={index}>
                            <p className="font-semibold text-gray-800 truncate">{item.title}</p>
                            <p className="text-sm text-gray-500">전발일: {item.date}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const CreditStatusChart = () => {
    const data = [
        { name: '공통교양', value: 43, total: 64, percentage: (43/64)*100 },
        { name: '심화교양', value: 15, total: 15, percentage: 100 },
        { name: '전공필수', value: 9, total: 9, percentage: 100 },
        { name: '전공선택', value: 33, total: 63, percentage: (33/63)*100 },
    ];

    return (
        <Card className="col-span-1 md:col-span-2 bg-[#F0F5FF]">
            <CardContent className="p-4 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 14, fill: '#4B5563' }} 
                          axisLine={false} 
                          tickLine={false}
                          dy={10}
                        />
                        <YAxis 
                          domain={[0, 100]} 
                          ticks={[100]} 
                          tickFormatter={(value) => `${value}%`}
                          tick={{ fontSize: 12, fill: '#3B82F6' }}
                          axisLine={false} 
                          tickLine={false}
                          width={40}
                        />
                        <Bar dataKey="percentage" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                            <LabelList 
                                dataKey="value" 
                                position="top" 
                                formatter={(value: number, entry: any) => {
                                  const item = data.find(d => d.name === entry.name);
                                  return item ? `${item.value}/${item.total}` : '';
                                }}
                                style={{ fontSize: 14, fill: '#3B82F6', fontWeight: 500 }}
                                offset={10} 
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

const ProgramCard = ({ imgSrc, title, category, period, personnel }: { imgSrc: string; title: string; category: string; period: string; personnel: string }) => (
    <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
        <Image src={imgSrc} alt={title} width={400} height={200} className="w-full h-40 object-cover" data-ai-hint="company poster"/>
        <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <div className="text-sm space-y-1 text-gray-600">
                <p><span className="font-semibold text-gray-800">구분</span> {category}</p>
                <p><span className="font-semibold text-gray-800">모집기간</span> {period}</p>
                <p><span className="font-semibold text-gray-800">모집인원</span> {personnel}</p>
            </div>
        </CardContent>
    </Card>
);

const RecommendedPrograms = () => {
    const programs = [
        {
            imgSrc: 'https://placehold.co/400x200.png',
            title: '정보처리기사 필기 특강',
            category: '취업 프로그램',
            period: '2025.05.15~2025.05.23',
            personnel: '50명'
        },
        {
            imgSrc: 'https://placehold.co/400x200.png',
            title: 'TOPCIT 정기평가 수요조사',
            category: '취업 프로그램',
            period: '2025.04.04~2025.04.23',
            personnel: '35명'
        },
        {
            imgSrc: 'https://placehold.co/400x200.png',
            title: '(대기업) 2025 합동 채용설명회',
            category: '취업 프로그램',
            period: '2025.05.13~2025.05.27',
            personnel: '제한없음'
        },
        {
            imgSrc: 'https://placehold.co/400x200.png',
            title: '학습성과 경진대회',
            category: '행사 프로그램',
            period: '2025.05.12~2025.05.30',
            personnel: '제한없음'
        }
    ];

    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">나만의 추천 프로그램</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {programs.map((program, index) => (
                    <ProgramCard key={index} {...program} />
                ))}
            </div>
        </section>
    );
};

export default function MainPage() {
  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-6 py-12 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <Calendar />
                </div>
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <ProgramSchedule />
                </div>
                <div className="md:col-span-3 lg:col-span-2">
                    <CreditStatusChart />
                </div>
            </div>
            <RecommendedPrograms />
        </main>
    </div>
  );
}
