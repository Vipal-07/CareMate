import React from 'react'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import patientAvatar from '../assets/images/patient-avatar.png'
import { HiStar } from 'react-icons/hi'

export default function Testimonial() {
  return (
    <div className='mt-[30px] lg:mt-[55px]'>
      <Swiper modules={[Pagination]} pagination={{ clickable: true }} spaceBetween={30} slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          }
        }}
      >
        <SwiperSlide>
          <div className='py-[30px] px-5 rounded-3'>
            <div className='flex items-center gap-[13px]'>
              <img src={patientAvatar} alt="" />
              <div className=''>
                <h4 className='text-[18px] font-semibold text-headingColor leading-[30px]'>Samantha</h4>
                <div className='flex items-center gap-[2px]'>
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                </div>
              </div>
            </div>
            <p className='text-[16px] text-textColor leading-7 mt-4 font-[400]'>
              "I truly appreciated the care I received; the staff was approachable, and the doctor was highly considerate."
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='py-[30px] px-5 rounded-3'>
            <div className='flex items-center gap-[13px]'>
              <img src={patientAvatar} alt="" />
              <div className=''>
                <h4 className='text-[18px] font-semibold text-headingColor leading-[30px]'>Rajiv</h4>
                <div className='flex items-center gap-[2px]'>
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                </div>
              </div>
            </div>
            <p className='text-[16px] text-textColor leading-7 mt-4 font-[400]'>
              "The clinic visit was smooth and pleasant, with friendly staff and a doctor who genuinely cared"
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='py-[30px] px-5 rounded-3'>
            <div className='flex items-center gap-[13px]'>
              <img src={patientAvatar} alt="" />
              <div className=''>
                <h4 className='text-[18px] font-semibold text-headingColor leading-[30px]'>Arvind</h4>
                <div className='flex items-center gap-[2px]'>
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                </div>
              </div>
            </div>
            <p className='text-[16px] text-textColor leading-7 mt-4 font-[400]'>
              "An outstanding experience — courteous staff and a very attentive doctor made me feel comfortable."
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='py-[30px] px-5 rounded-3'>
            <div className='flex items-center gap-[13px]'>
              <img src={patientAvatar} alt="" />
              <div className=''>
                <h4 className='text-[18px] font-semibold text-headingColor leading-[30px]'>Kunaal</h4>
                <div className='flex items-center gap-[2px]'>
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                </div>
              </div>
            </div>
            <p className='text-[16px] text-textColor leading-7 mt-4 font-[400]'>
              "I’m very satisfied with my experience here; the team was kind, and the doctor provided exceptional care"
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='py-[30px] px-5 rounded-3'>
            <div className='flex items-center gap-[13px]'>
              <img src={patientAvatar} alt="" />
              <div className=''>
                <h4 className='text-[18px] font-semibold text-headingColor leading-[30px]'>Abhay</h4>
                <div className='flex items-center gap-[2px]'>
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                  <HiStar className='text-[#FFC107] w-[18px] h-5' />
                </div>
              </div>
            </div>
            <p className='text-[16px] text-textColor leading-7 mt-4 font-[400]'>
              "My visit to the clinic was excellent — the staff was warm and welcoming, and the doctor listened carefully to my concerns."
            </p>
          </div>
        </SwiperSlide>
      </Swiper>

    </div>
  )
}
