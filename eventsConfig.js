import { EventEmitter } from 'events';

const emitter = new EventEmitter();
emitter.setMaxListeners(20);
 
