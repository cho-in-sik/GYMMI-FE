'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Progress } from '@/components/ui/progress';

import { faker } from '@faker-js/faker';

import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';
import { useRouter } from 'next/navigation';
import customAxios from '@/utils/cutstomAxios';

const data = [
  {
    id: 1,
    name: faker.person.firstName(),
    value: faker.number.int(100),
  },
  {
    id: 2,
    name: faker.person.firstName(),
    value: faker.number.int(100),
  },
  {
    id: 3,
    name: faker.person.firstName(),
    value: faker.number.int(100),
  },
  {
    id: 4,
    name: faker.person.firstName(),
    value: faker.number.int(100),
  },
  {
    id: 5,
    name: faker.person.firstName(),
    value: faker.number.int(100),
  },
];

const handleTest = async () => {
  const res = await customAxios.get('health-check');
  console.log(res);
};

export default function MainCarousel() {
  const router = useRouter();
  return (
    <div className="w-full h-full overflow-hidden">
      <button onClick={handleTest}>its test</button>
      <Swiper
        slidesPerView={1}
        spaceBetween={18}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        centeredSlides={true}
        className="mySwiper"
      >
        {data?.map((item) => {
          return (
            <SwiperSlide
              key={item.id}
              onClick={() => router.push(`workspace/${'gymmi'}/mygroup`)}
            >
              <div className="pt-5 px-6">
                <h2 className="font-galmuri text-2xl font-medium mb-3.5">
                  {item.name}
                </h2>
                <Progress value={item.value} className="h-1.5" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}