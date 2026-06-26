import { Application } from '@hotwired/stimulus';
import HeaderController from './controllers/header';

window.Stimulus = Application.start();
window.Stimulus.register('header', HeaderController);
