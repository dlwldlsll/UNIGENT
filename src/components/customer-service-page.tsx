'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Phone, Mail, MessageSquare } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CustomerServicePage = () => {
  const faqs = [
    {
      question: '비밀번호를 잊어버렸어요.',
      answer: '로그인 페이지에서 "비밀번호 찾기"를 통해 임시 비밀번호를 발급받을 수 있습니다. 이후 마이페이지에서 새로운 비밀번호로 변경해주세요.'
    },
    {
      question: '회원 정보는 어떻게 수정하나요?',
      answer: '마이페이지 > 회원 정보 메뉴에서 이메일, 연락처 등의 정보를 수정할 수 있습니다. 학번, 학과 등 일부 정보는 수정이 불가능합니다.'
    },
    {
      question: '추천 프로그램은 어떤 기준으로 제공되나요?',
      answer: '회원님의 학과, 학년, 그리고 커리어 설정에서 선택한 관심 직무 및 회사를 기반으로 맞춤형 프로그램을 추천해 드립니다.'
    },
    {
      question: '회원 탈퇴는 어떻게 하나요?',
      answer: '회원 탈퇴는 고객센터로 직접 문의해주시기 바랍니다. 탈퇴 시 모든 개인 정보와 활동 내역이 삭제되며, 복구할 수 없습니다.'
    }
  ];

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
                  className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  포트폴리오
                </a>
                <a
                  href="/resume"
                  className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  자소서/이력서
                </a>
                <a
                  href="/customer-service"
                  className="block px-4 py-2 text-blue-600 font-bold bg-blue-50 rounded-md"
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
                    <span>홈 &gt; 마이페이지 &gt; 고객센터</span>
                </div>
                <h1 className="text-3xl font-bold mt-2">고객센터</h1>
            </div>
            
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>문의하기</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-6 text-center">
                        <div className="flex flex-col items-center space-y-2">
                            <Phone className="w-10 h-10 text-blue-600" />
                            <p className="font-semibold">전화 문의</p>
                            <p className="text-sm text-gray-600">1588-1234</p>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <Mail className="w-10 h-10 text-blue-600" />
                            <p className="font-semibold">이메일 문의</p>
                            <p className="text-sm text-gray-600">help@unigent.com</p>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <MessageSquare className="w-10 h-10 text-blue-600" />
                            <p className="font-semibold">1:1 문의</p>
                            <p className="text-sm text-gray-600">문의 게시판 바로가기</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>자주 묻는 질문 (FAQ)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent>{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerServicePage;
