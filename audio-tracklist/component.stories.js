import startCase from 'lodash/startCase';
import componentAudioPlayer from './component.pug';

export default {
  title: 'Components / AudioPlayerWithTracklist',
}

export const AudioPlayerWithTracklist = () => {
  const props = {
    playlist: [
      {
        id: 's311',
        title: "TRACK NAME 1",
        duration: "03:32",
        source: {src: require("Music/audio-1.mp3"), type: "audio/mp3"}
      },
      {

        id: 's312',
        title: "TRACK NAME 2",
        duration: "03:32",
        source: {src: require("Music/audio-1.mp3"), type: "audio/mp3"}
      },
      {
        id: 's313',
        title: "TRACK NAME 3",
        duration: "03:03",
        source: {src: "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3", type: "audio/mp3"}
      },
      {
        id: 's314',
        title: "TRACK NAME 4",
        duration: "03:03",
        source: {src: "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.ogg", type: "audio/ogg"}
      }
    ]
  }
  return componentAudioPlayer({ props, startCase });
};
