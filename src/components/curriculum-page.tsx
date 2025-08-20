'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CourseCard = ({ title, tags, description, link }: { title: string; tags: string[]; description: string; link: string }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const { toast } = useToast();

    const handleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.origin + link)
            .then(() => {
                toast({
                    title: "Copied to Clipboard",
                    description: "Course link has been copied.",
                });
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                toast({
                    title: "Error",
                    description: "Could not copy the link.",
                    variant: "destructive"
                });
            });
    };
    
    return (
        <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-600 font-normal">{tag}</Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <a href={link} className="flex items-center gap-1 hover:underline" target="_blank" rel="noopener noreferrer">
                강의 계획서
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
              <div className="flex gap-2">
                <button onClick={handleFavorite}>
                    <Star className={`w-4 h-4 ${isFavorited ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                </button>
                <button onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
    );
}

const CurriculumPage = () => {
    const [activeSemester, setActiveSemester] = useState('1학년 2학기');
    const semesters = ['1학년 1학기', '1학년 2학기', '3학년 1학기', '3학년 2학기', '4학년 1학기', '4학년 2학기', '기타'];
    
    const courses = [
        { title: '데이터와 코딩', tags: ['조용윤 교수님', '2학점', '필수교양', '파이썬 기초'], description: '데이터 분석의 기초와 파이썬에 대해 공부할 수 있는 과목입니다.', link: '#' },
        { title: '어드벤처 디자인', tags: ['신창선 교수님', '3학점', '필수교양', '사업 시뮬레이션'], description: '가설과 간단한 시험 계획을 세워 아이템을 만들어보는 과목입니다.', link: '#' },
        { title: '데이터 과학 이해', tags: ['구단영 교수님', '3학점', '필수교양', '데이터 사이언스'], description: '데이터 사이언스 기초에 대해 배울 수 있는 과목입니다.', link: '#' },
        { title: '정량적 사고와 컴퓨팅 사고', tags: ['주아리 교수님', '2학점', '공통교양', '파이썬 기초'], description: '파이썬의 기초에 대해 학습할 수 있는 과목입니다. 다.', link: '#' },
        { title: '발명과 특허', tags: ['장가연 교수님', '3학점', '필수교양', '특허'], description: '공학 분야의 특허와 관련된 내용을 학습할 수 있는 과목입니다.', link: '#' },
        { title: '이공계생을 위한 인문학', tags: ['이지민 교수님', '2학점', '선택교양', '인문학'], description: '이공계생들이 인문학에 대해 흥미롭게 충분히 학습할 수 있습니다.', link: '#' },
    ];

  return (
    <div className="min-h-screen bg-[#F7F9FF]">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-600">UNIGENT</a>
          <nav className="hidden md:flex items-center space-x-8 text-gray-600">
            <a href="/" className="hover:text-blue-600">마이페이지</a>
            <a href="#" className="hover:text-blue-600">프로그램</a>
            <a href="#" className="hover:text-blue-600">진로/취업</a>
            <a href="/curriculum" className="text-blue-600 font-bold">커리큘럼agent</a>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        <section className="flex flex-col md:flex-row items-center mb-12">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-md">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 18V12" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 15H15" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold">커리큘럼 + AI AGENT</h2>
                <p className="text-gray-600 mt-2">나의 학사 정보를 반영한 맞춤 커리큘럼,<br />이제 AI Agent를 이용해 가이드를 똑똑하게.</p>
              </div>
            </div>
        </section>

        <section>
            <h3 className="text-xl font-bold mb-4">학기별 안성맞춤 수업!</h3>
            <div className="flex flex-wrap gap-3 border-b pb-4 mb-8">
                {semesters.map((semester) => (
                    <Button
                        key={semester}
                        variant={activeSemester === semester ? 'default' : 'secondary'}
                        onClick={() => setActiveSemester(semester)}
                        className={`rounded-full px-6 py-2 text-md font-semibold ${activeSemester === semester ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {semester}
                    </Button>
                ))}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <CourseCard key={index} {...course} />
                ))}
            </div>
        </section>

      </main>
    </div>
  );
};

export default CurriculumPage;
