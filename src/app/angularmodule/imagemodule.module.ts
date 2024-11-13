import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class imagemodule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'submit',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/submit.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'reset',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/reset.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'download-file',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/download-file.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'preview',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/preview.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'send',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/send.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'back',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/back.svg')
    );
  }
}
