import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[wfmDropdown]',
    exportAs: 'wfmDropdown'
})
export class DropdownDirective{
    @HostBinding('class.show') isOpen = false;

    @HostListener('click') onClick(){
        this.isOpen = !this.isOpen;
    }
}