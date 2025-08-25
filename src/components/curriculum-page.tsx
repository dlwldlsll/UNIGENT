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
    const semesters = ['1학년 1학기', '1학년 2학기', '2학년 1학기', '2학년 2학기', '3학년 1학기', '3학년 2학기', '4학년 1학기', '4학년 2학기', '기타'];
    
    const semesterCourses: { [key: string]: { title: string; tags: string[]; description: string; link: string }[] } = {
        '1학년 2학기': [
            { title: '데이터와 코딩', tags: ['조용윤 교수님', '2학점', '필수교양', '파이썬 기초'], description: '데이터 분석의 기초와 파이썬에 대해 공부할 수 있는 과목입니다.', link: '#' },
            { title: '어드벤처 디자인', tags: ['신창선 교수님', '3학점', '필수교양', '사업 시뮬레이션'], description: '가설과 간단한 시험 계획을 세워 아이템을 만들어보는 과목입니다.', link: '#' },
            { title: '데이터 과학 이해', tags: ['구단영 교수님', '3학점', '필수교양', '데이터 사이언스'], description: '데이터 사이언스 기초에 대해 배울 수 있는 과목입니다.', link: '#' },
            { title: '정량적 사고와 컴퓨팅 사고', tags: ['주아리 교수님', '2학점', '공통교양', '파이썬 기초'], description: '파이썬의 기초에 대해 학습할 수 있는 과목입니다. 다.', link: '#' },
            { title: '발명과 특허', tags: ['장가연 교수님', '3학점', '필수교양', '특허'], description: '공학 분야의 특허와 관련된 내용을 학습할 수 있는 과목입니다.', link: '#' },
            { title: '이공계생을 위한 인문학', tags: ['이지민 교수님', '2학점', '선택교양', '인문학'], description: '이공계생들이 인문학에 대해 흥미롭게 충분히 학습할 수 있습니다.', link: '#' },
        ],
        '2학년 1학기': [
            { title: '회로이론', tags: ['최정훈 교수님', '3학점', '전공선택'], description: '전기 회로의 기본 원리와 분석 방법을 학습하는 과목입니다.', link: '#' },
            { title: 'C프로그래밍', tags: ['조용윤 교수님', '3학점', '전공선택'], description: 'C언어를 이용한 프로그래밍 기초와 응용을 다루는 과목입니다.', link: '#' },
            { title: '멀티미디어 콘텐츠', tags: ['한영서 교수님', '3학점', '전공선택'], description: '다양한 멀티미디어 콘텐츠의 제작 및 활용 기술을 배웁니다.', link: '#' },
            { title: '미술의 이해', tags: ['이석희 교수님', '3학점', '심화교양'], description: '미술 작품의 감상과 이해를 통해 창의적 사고를 기릅니다.', link: '#' },
            { title: '3D 모델링', tags: ['박한별 교수님', '3학점', '전공선택'], description: '3D 모델링 소프트웨어를 활용하여 입체적인 객체를 만드는 방법을 학습합니다.', link: '#' },
            { title: '나의 미래 디자인', tags: ['김태희 교수님', '2학점', '심화교양'], description: '자신의 미래를 설계하고 진로를 탐색하는 방법을 배우는 과목입니다.', link: '#' },
        ],
        '2학년 2학기': [
            { title: '자료구조 및 알고리즘', tags: ['박효림 교수님', '3학점', '전공선택'], description: '컴퓨터 과학의 핵심인 자료구조와 알고리즘에 대해 심도있게 학습합니다.', link: '#' },
            { title: 'JAVA', tags: ['조용윤 교수님', '3학점', '전공선택'], description: '객체 지향 프로그래밍 언어인 Java의 기본 문법과 활용법을 배웁니다.', link: '#' },
            { title: '디지털논리', tags: ['박철영 교수님', '3학점', '전공선택'], description: '컴퓨터의 기본 구성 요소인 디지털 논리 회로의 원리를 이해합니다.', link: '#' },
            { title: '선형대수', tags: ['시간강사', '3학점', '전공선택'], description: '벡터, 행렬 등 인공지능과 데이터 과학의 기반이 되는 선형대수학을 학습합니다.', link: '#' },
            { title: '빅데이터 기초수학', tags: ['김가연 교수님', '3학점', '전공선택'], description: '빅데이터 분석에 필요한 핵심적인 수학적 개념을 다룹니다.', link: '#' },
            { title: '생성형 인공지능 활용 실습', tags: ['김종찬 교수님', '3학점', '심화교양'], description: '생성형 AI 모델의 원리를 이해하고 실제 문제에 적용하는 방법을 학습합니다.', link: '#' },
        ],
        '3학년 1학기': [
            { title: '음향응용 및 사운드디자인', tags: ['오원근 교수님', '3학점', '전공선택'], description: '음향 신호 처리와 사운드 디자인의 원리를 학습합니다.', link: '#' },
            { title: '데이터베이스', tags: ['심춘보 교수님', '3학점', '전공선택'], description: '데이터베이스 시스템의 설계, 구현 및 관리에 대해 학습합니다.', link: '#' },
            { title: '머신러닝', tags: ['장가연 교수님', '3학점', '전공선택'], description: '다양한 머신러닝 알고리즘의 이론과 실제 적용 방법을 배웁니다.', link: '#' },
            { title: '운영체제', tags: ['사인츠 교수님', '3학점', '전공선택'], description: '컴퓨터 시스템의 핵심인 운영체제의 구조와 작동 원리를 이해합니다.', link: '#' },
            { title: '데이터통신과 인터넷', tags: ['김평안 교수님', '3학점', '전공선택'], description: '데이터 통신과 인터넷의 기본 원리 및 프로토콜에 대해 학습합니다.', link: '#' },
        ],
    };

    const courses = semesterCourses[activeSemester] || [];

  return (
    <div className="min-h-screen bg-[#F7F9FF]">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-600">UNIGENT</a>
          <nav className="hidden md:flex items-center space-x-8 text-gray-600">
            <a href="/my-page" className="hover:text-blue-600">마이페이지</a>
            <a href="/program" className="hover:text-blue-600">프로그램</a>
            <a href="/career" className="hover:text-blue-600">진로/취업</a>
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
                {courses.length > 0 ? (
                    courses.map((course, index) => (
                        <CourseCard key={index} {...course} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">해당 학기의 수업 정보가 없습니다.</p>
                )}
            </div>
        </section>

      </main>
    </div>
  );
};

export default CurriculumPage;

    