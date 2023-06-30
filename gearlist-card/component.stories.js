import startCase from 'lodash/startCase';
import componentGearlistCard from './component.pug';

export default {
  title: 'Components / GearlistCard',
};

const gearlistCardPosition = {
  left: 'left',
  right: 'right'
};

export const GearlistCardViewRight = () => {
  const props = {
    position: gearlistCardPosition.right,
    title: 'Audio Interface:',
    item1: 'Universal Audio Apollo 8 / x8 ',
    item2: 'Thunderbolt 2 and 3 compatibility'
  };
  return componentGearlistCard({ props, startCase })
};

export const GearlistCardViewLeft = () => {
  const props = {
    position: gearlistCardPosition.left,
    title: 'Monitoring:',
    item1: 'Yamaha NS10',
    item2: 'Dynaudio LYD 8',
    item3: 'KRK 10S - Powered Subwoofer'
  };
  return componentGearlistCard({ props, startCase })
};
