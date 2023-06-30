import startCase from 'lodash/startCase';
import componentAudioPlayer from './component.pug';

export default {
  title: 'Components / AudioPlayer'
}

export const AudioPlayer = () => {

  const props = {
    id: 'track-1-1',
    duration: '03:32',
    title: "TRACK NAME",
    source: {
      src: require('Music/audio-1.mp3'),
      type: "audio/mp3"
    }
  };

  return componentAudioPlayer({ props, startCase });
};
