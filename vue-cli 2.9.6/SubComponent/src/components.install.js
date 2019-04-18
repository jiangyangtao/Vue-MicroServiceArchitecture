import component from '@/components/HelloWorld.Vue';
// import {
//   Store,
// } from 'portalmiddleware';

const Metadata = {
  Package: 'ComponentName',
};

const Components = [
  component,
];

function Install(option) {
  // if (option.store && !option.store.QueryTableStore) option.store.registerModule('ComponentName', QueryTableStore);
}

export default {
  Metadata,
  Components,
  Install,
};
