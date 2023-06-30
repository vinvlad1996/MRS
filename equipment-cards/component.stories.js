import startCase from 'lodash/startCase';
import componentEquipmentCards from './component.pug';

export default {
  title: 'Components / EquipmentCards',
};

const cardView = {
  default: 'default',
  primary: 'primary'
};

const cardsSize = {
  big: 'big'
};

const titlePosition = {
  top: 'top'
};

export const EquipmentCardsDefault = () => {
  const props = { view: cardView.default };
  return componentEquipmentCards({ props, startCase });
};

export const EquipmentCardsPrimary = () => {
  const props = { view: cardView.primary, position: titlePosition.default };
  return componentEquipmentCards({ props, startCase });
};