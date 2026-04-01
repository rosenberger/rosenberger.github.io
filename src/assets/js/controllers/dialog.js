import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['dialog'];

    connect() {
        console.log(this.hasDialogTarget);
    }

    open(event) {
        event.preventDefault();
        if (this.hasDialogTarget) {
            this.dialogTarget.showModal();
        }
    }

    close() {
        if (this.hasDialogTarget) {
            this.dialogTarget.close();
        }
    }
}