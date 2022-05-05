import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, FreeMode, Mousewheel } from 'swiper';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';
import 'swiper/css';


export default function ChatFolders() {
    return (
        <Swiper
        modules={[Scrollbar, FreeMode, Mousewheel]}
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          scrollbar={true}
          mousewheel={true}
        >
          {/* <SwiperSlide className='flex justify-center bg-black bg-opacity-40 rounded-full text-white font-semibold'>Slide 1</SwiperSlide>
          <SwiperSlide className='flex justify-center bg-black bg-opacity-40 rounded-full text-white font-semibold'>Slide 2</SwiperSlide>
          <SwiperSlide className='flex justify-center bg-black bg-opacity-40 rounded-full text-white font-semibold'>Slide 3</SwiperSlide>
          <SwiperSlide className='flex justify-center bg-black bg-opacity-40 rounded-full text-white font-semibold'>Slide 4</SwiperSlide> */}
          <SwiperSlide >ChatsFolder</SwiperSlide>
          <SwiperSlide >ChatsFolder</SwiperSlide>
          <SwiperSlide >ChatsFolder</SwiperSlide>
          <SwiperSlide >ChatsFolder</SwiperSlide>
          <SwiperSlide >ChatsFolder</SwiperSlide>
          <SwiperSlide >ChatsFolder</SwiperSlide>
          <SwiperSlide >ChatsFolder</SwiperSlide>
          <div className='swiper-slide swiper-wrapper swiper swiper-scrollbar'>

        </div>
        </Swiper>
      );
}