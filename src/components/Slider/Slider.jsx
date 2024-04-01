import React, { useState, memo } from 'react';
import { SliderWrapper, Slide, DeleteButton, TrashIcon } from './Slider.styled';
import { FullscreenSlider } from './components';

export const Slider = memo(({ children, onDelete }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const openFullscreen = (e, index) => {
    setSelectedIdx(index);
    setIsFullscreen(true);
  };

  return (
    children?.length > 0 && (
      <>
        <SliderWrapper>
          {React.Children.map(children, (child, index) => {
            return (
              <Slide key={index} onClick={(e) => openFullscreen(e, index)}>
                {child}
                {onDelete && (
                  <DeleteButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(child.props['data-file'].name);
                    }}
                  >
                    <TrashIcon />
                  </DeleteButton>
                )}
              </Slide>
            );
          })}
        </SliderWrapper>
        {isFullscreen && (
          <FullscreenSlider
            children={children}
            onDelete={onDelete}
            selectedIdx={selectedIdx}
            setSelectedIdx={setSelectedIdx}
            setIsFullscreen={setIsFullscreen}
          />
        )}
      </>
    )
  );
});
