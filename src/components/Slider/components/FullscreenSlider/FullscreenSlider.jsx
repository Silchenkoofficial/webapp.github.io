import React, { useRef, useState } from 'react';
import usePortal from 'react-useportal';
import ReactSlick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  ArrowLeftIcon,
  BackButton,
  FilesCounter,
  FullscreenHeader,
  TrashWrapper,
  FullscreenWrapper,
  TrashIcon,
  FullscreenSlide,
} from './FullscreenSlider.styled';

export const FullscreenSlider = ({
  children,
  onDelete,
  selectedIdx,
  setSelectedIdx,
  setIsFullscreen,
}) => {
  const { Portal } = usePortal({ programmaticallyOpen: true });
  const [isHeaderShow, setIsHeaderShow] = useState(true);
  const slideRefs = useRef(children.map(() => React.createRef()));
  const backgroundRef = useRef(null);

  let startY = 0;
  let startX = 0;
  let deltaY = 0;
  let deltaX = 0;
  let timeStart = new Date();

  const settings = {
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: selectedIdx,
    beforeChange: (_, index) => setSelectedIdx(index),
    focusOnSelect: false,
  };

  const handleDelete = (index) => {
    onDelete(children[index].props['data-file'].name);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  //const handleTouchStart = (e) => {
  //  startY = e.touches[0].clientY;
  //  startX = e.touches[0].clientX;
  //  timeStart = new Date();
  //};
  //
  //const handleTouchMove = (e, index) => {
  //  const currentY = e.touches[0].clientY;
  //  const currentX = e.touches[0].clientX;
  //  deltaY = startY - currentY;
  //  deltaX = startX - currentX;
  //
  //  if (Math.abs(deltaX) > Math.abs(deltaY)) {
  //    deltaY = 0;
  //  } else {
  //    slideRefs.current[index].current.style.transform =
  //      `translateY(${-deltaY}px) scale(${Math.max(0.6, Math.min(1, 1 - (0.4 * Math.abs(deltaY)) / 500))})`;
  //    slideRefs.current[index].current.style.transition = `none`;
  //    backgroundRef.current.style.transition = `none`;
  //  }
  //};
  //
  //const handleTouchEnd = (e, index) => {
  //  const endTime = new Date();
  //  const timeDiff = endTime - timeStart;
  //  if (deltaY < -250 || (Math.abs(deltaY) > 50 && timeDiff < 350)) {
  //    closeFullscreen();
  //  } else {
  //    slideRefs.current[index].current.style.transition = `transform 0.3s`;
  //    backgroundRef.current.style.transition = `background 0.3s`;
  //  }
  //  slideRefs.current[index].current.style.transform = `translateY(0)`;
  //  deltaY = 0;
  //};

  return (
    <Portal>
      <FullscreenWrapper ref={backgroundRef}>
        <FullscreenHeader isHeaderShow={isHeaderShow}>
          <BackButton onClick={closeFullscreen}>
            <ArrowLeftIcon />
            Назад
          </BackButton>
          <FilesCounter>
            {selectedIdx + 1} из {children.length}
          </FilesCounter>
          <TrashWrapper>
            {onDelete && (
              <TrashIcon onClick={() => handleDelete(selectedIdx)} />
            )}
          </TrashWrapper>
        </FullscreenHeader>
        <ReactSlick {...settings} className={'slider-container'}>
          {React.Children.map(children, (child, index) => {
            return (
              <FullscreenSlide
                key={index}
                ref={slideRefs.current[index]}
                onClick={(e) => setIsHeaderShow((prev) => !prev)}
                //onTouchStart={handleTouchStart}
                //onTouchMove={(e) => handleTouchMove(e, index)}
                //onTouchEnd={(e) => handleTouchEnd(e, index)}
              >
                {child}
              </FullscreenSlide>
            );
          })}
        </ReactSlick>
      </FullscreenWrapper>
    </Portal>
  );
};
