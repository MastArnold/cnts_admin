import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { ConfirmCardComponent } from "../../components/cards/confirm-card/confirm-card.component";

@Component({
  selector: 'app-admin-layout',
  imports: [NgClass, RouterOutlet, RouterLink, ConfirmCardComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class AdminLayoutComponent implements OnInit{
  menu = [
    {
      'name': 'dashboard',
      'text': 'Tableau de bord',
      'target': '/dashboard',
      'active': false
    },
    {
      'name': 'center',
      'text': 'Center',
      'target': '/center',
      'active': false
    },
    {
      'name': 'staff',
      'text': 'Personnel',
      'target': '/staff',
      'active': false
    },
    {
      'name': 'donor',
      'text': 'Donneur',
      'target': '/donor',
      'active': true
    },
    {
      'name': 'donation',
      'text': 'Don',
      'target': '/donation',
      'active': false
    },
    {
      'name': 'exam',
      'text': 'Examen',
      'target': '/exam',
      'active': false
    },
    {
      'name': 'user',
      'text': 'Utilisateur',
      'target': '/user',
      'active': false
    },
  ];

  @ViewChild('avatar') avatar!: ElementRef;
  @ViewChild('authCard', { static: false }) authCard!: ElementRef;

  isOpen = signal(false);

  ngOnInit(): void {
    
  }

  active(name: string){
    for(let item of this.menu){
      if(item.name == name){
        item.active = true;
      }else{
        item.active = false;
      }
    }
  }

  toggleAuthCard(event: Event){
    event.stopPropagation();

    this.isOpen.set(!this.isOpen());
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const clickedTarget = event.target as HTMLElement;

    const cardExists = this.authCard && this.authCard.nativeElement;
    
    if(
      this.isOpen() &&
      (!cardExists || !this.authCard.nativeElement.contains(clickedTarget))
    ) {
      this.isOpen.set(false);
    }
  }
}
