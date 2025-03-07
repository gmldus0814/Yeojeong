import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import WritePost from '../../app/components/WritePost';
import Sidebar from '../../app/sidebar';

const countries = [
  { name: 'Korea', cities: ['Seoul', 'Gimpo', 'Busan', 'Jeju'] },
  { name: 'Japan', cities: ['Tokyo', 'Osaka', 'Hukuoka'] },
  { name: 'China', cities: ['Shanghai'] }
];

const CityPage = () => {
  const router = useRouter();
  const { country, city } = router.query;

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openCountry, setOpenCountry] = useState(null);

  // 클라이언트에서만 렌더링할 수 있도록 useEffect 추가
  useEffect(() => {
    if (country && city) {
      setOpenSidebar(true); // 예시로, URL에 값이 있을 때 사이드바를 열도록 설정
    }
  }, [country, city]);

  if (router.isFallback || !country || !city) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar
        countries={countries}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        openCountry={openCountry}
        setOpenCountry={setOpenCountry}
      />
      <h1 className="text-3xl font-semibold text-center mb-8">
        {city}에서의 여행 ({country})
      </h1>
      <WritePost /> {/* 글 작성 컴포넌트 렌더링 */}
    </div>
  );
};

export default CityPage;
