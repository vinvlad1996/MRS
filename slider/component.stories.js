import startCase from 'lodash/startCase';
import componentSlider from './component.pug';

export default {
  title: 'Components / Slider',
};

export const Slider = () => {
  const props = {
    slides: [
      {content: "Slide 1"},
      {content: "Slide 2"},
      {content: "Slide 3"}
    ]
  };
  return componentSlider({props, startCase});
};