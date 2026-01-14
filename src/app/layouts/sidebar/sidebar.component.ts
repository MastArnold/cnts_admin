import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [NgClass, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true
})
export class SidebarComponent implements OnInit{
  menu = [
    {
      'name': 'dashboard',
      'text': 'Tableau de bord',
      'target': '/dashboard',
      'active': true
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
      'active': false
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
}
