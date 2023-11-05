import { Component, OnInit, Renderer2, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  @Input() messageToShow: string | any;
  @Input() messageText: string = '';


  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    console.log(this.messageText);
    if (this.messageToShow) {
      // Mostrar la alerta
      this.renderer.addClass(document.body, 'showing-alert');
    }

  }
}
