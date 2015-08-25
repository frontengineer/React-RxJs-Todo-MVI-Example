import Baobab from 'baobab';
import store from './state';
let tree = new Baobab(store);

export default tree;
