import { Application } from '@hotwired/stimulus';
import HeaderController from './controllers/header';
import DialogController from './controllers/dialog';

window.Stimulus = Application.start();
window.Stimulus.register('header', HeaderController);
window.Stimulus.register('dialog', DialogController);
