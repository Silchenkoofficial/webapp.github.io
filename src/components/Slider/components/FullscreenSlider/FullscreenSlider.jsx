import React, { useEffect, useRef, useState } from 'react';
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
  const tg = Window.Telegram?.WebApp;
  const { Portal } = usePortal({ programmaticallyOpen: true });
  const [isHeaderShow, setIsHeaderShow] = useState(true);
  const slideRefs = useRef(children.map(() => React.createRef()));
  const backgroundRef = useRef(null);
  
  useEffect(() => {
    if (tg) {
      tg.BackButton.isVisible = true;
      tg.onClick(() => {
        tg.BackButton.isVisible = false;
        setIsFullscreen(false);
      });
    }
  }, [])

  useEffect(() => {
    tg.BackButton.isVisible = true;
    tg.onClick(() => {
      tg.BackButton.isVisible = false;
      setIsFullscreen(false);
    });
  }, []);

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
    onDelete(children[index].props['data-file']);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

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
        <div
          style={{
            height: '100.1vh',
          }}
        >
          <ReactSlick {...settings} className={'slider-container'}>
            {React.Children.map(children, (child, index) => {
              return (
                <FullscreenSlide
                  key={index}
                  ref={slideRefs.current[index]}
                  onClick={(e) => setIsHeaderShow((prev) => !prev)}
                >
                  {child}
                </FullscreenSlide>
              );
            })}
          </ReactSlick>
        </div>
      </FullscreenWrapper>
    </Portal>
  );
};
