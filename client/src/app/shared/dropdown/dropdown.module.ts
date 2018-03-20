import { NgModule, ModuleWithProviders } from '@angular/core';
import { Dropdown, DropdownToggle, DropdownMenu } from './dropdown.directive';

const DROPDOWN_DIRECTIVES = [Dropdown, DropdownToggle, DropdownMenu];

@NgModule({declarations: DROPDOWN_DIRECTIVES, exports: DROPDOWN_DIRECTIVES})
export class DropdownModule {
  static forRoot(): ModuleWithProviders { return {ngModule: DropdownModule}; }
}
