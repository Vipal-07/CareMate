import React from 'react'
import aboutImg1 from "../assets/images/about.png";
import aboutCardImg from "../assets/images/about-card.png";
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <section>
            <div className='container'>
                <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
                    {/* **img** */}
                    <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
                        <img src={aboutImg1} alt="" />
                        <div className='absolute z-10 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]'>
                            <img src={aboutCardImg} alt="" />
                        </div>
                    </div>
                    {/* **content** */}
                    <div className='w-full lg:w-1/2 xl:w-w-[670px] order-1 lg:order-2'>
                        <h2 className='heading'>
                            Proud to be one of the nation best clinics.
                        </h2>
                        <p className='text_para'>
                            Our clinic is dedicated to providing top-quality healthcare services to our community. With a team of experienced medical professionals, we offer a wide range of services to meet your health needs.
                        </p>

                        <p className='text_para mt-[30px]'>
                            We prioritize patient care and comfort, ensuring that every visit is a positive experience. Our state-of-the-art facilities and advanced medical technologies enable us to deliver effective treatments.
                        </p>
                        <Link to="/">
                            <button className='btn'>Learn More</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
