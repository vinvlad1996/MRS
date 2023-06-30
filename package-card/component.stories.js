import startCase from 'lodash/startCase';
import componentPackageCard from './component.pug';

export default {
  title: 'Components / PackageCard',
};

const packageCardView = {
  default: 'default',
  main: 'main'
}

const packageCardSize = {
  default: 'default',
  big: 'big'
}

const titleType = {
  first: 'first',
  second: 'second',
  third: 'third'
}

const noteMargin = {
  large: 'large'
}

export const PackageCardViewDefault = () => {
  const props = {
    view: packageCardView.default,
    size: packageCardSize.default,
    type: titleType.first,
    title: 'title default',
    hours: '12 hr',
    cost: '100$',
    personalCost: '50$',
    finalPrice: '900'
  };
  return componentPackageCard({ props, startCase });
};

export const PackageCardViewMain= () => {
  const props = {
    view: packageCardView.main,
    size: packageCardSize.big,
    type: titleType.second,
    margin: noteMargin.large,
    title: 'title default',
    hours: '12 ht',
    cost: '100$',
    personalCost: '50$',
    finalPrice: '900'
  };
  return componentPackageCard({ props, startCase });
};