import React from "react";
import { Flex, GradientText } from "@/components";
import { Container } from "@/components";
import { GeneralCard } from "@/components/Card";
import { GENERAL_CARD_LIST_1 } from "@/utils/constants";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";

function IdentifyView() {
  return (
    <Container>
      <Flex
        align="items-center"
        justifyContent="justify-center"
        className="space-x-12 laptop:flex-col laptop:space-x-0 laptop:space-y-20"
      >
        <div className="w-1/2 laptop:w-full overflow-x-clip">
          <Swiper
            effect="cards"
            centeredSlides={true}
            loop={true}
            grabCursor={true}
            cardsEffect={{
              slideShadows: false,
              // rotate: true
              // perSlideOffset: 20,
              perSlideRotate: 20
            }}
            // autoplay={{
            //   delay: 3000,
            //   disableOnInteraction: false
            // }}
            modules={[EffectCards]}
            width={250}
            breakpoints={{
              769: {
                width: 300
              }
            }}
            className="badge_effect_swiper"
          >
            {GENERAL_CARD_LIST_1.map((item, index) => (
              <SwiperSlide key={`domain_card_${index}`}>
                <GeneralCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-1/2 laptop:w-full">
          <Flex direction="flex-col" className="space-y-[35px] font-space_grotesk laptop:items-center">
            <div className="font-space_grotesk font-700 text-[48px] uppercase desktop:text-[30px] mobile:text-[24px] laptop:text-center">
              How to create <GradientText>identity ?</GradientText>
            </div>

            <Flex
              direction="flex-col"
              className="text-main-400 text-[16px] font-400 desktop:text-[14px] mobile:text-[12px]"
            >
              <p>
                Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for
                previewing layouts and visual mockups.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </Flex>

            <button className="max-w-[528px] h-[80px] flex-shrink-0 rounded-[53px] border border-solid border-main-300 bg-primary_gradient_button  desktop:h-[60px]  mobile:h-[60px] laptop:px-20 tablet:px-4">
              <span className="uppercase text-primary text-[28px] font-space_grotesk font-700 desktop:text-[24px] mobile:text-[20px]">
                Create identity
              </span>
            </button>
          </Flex>
        </div>
      </Flex>
    </Container>
  );
}

export default IdentifyView;
