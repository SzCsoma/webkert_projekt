import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { News } from './news.model';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  newsList: News[] = [
    {
      title: 'Első hír',
      summary: 'Ez az első hír rövid összefoglalója.',
      content: 'Ez az első hír teljes tartalma.'
    },
    {
      title: 'Második hír',
      summary: 'Ez a második hír rövid összefoglalója.',
      content: 'Ez a második hír teljes tartalma.'
    },
    {
      title: 'Harmadik hír',
      summary: 'Ez a harmadik hír rövid összefoglalója.',
      content: 'Ez a harmadik hír teljes tartalma.'
    }
  ];

  selectedNews: News | null = null;
  showAddNewsForm = false;
  addNewsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addNewsForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  openNewsModal(news: News): void {
    this.selectedNews = news;
  }

  closeNewsModal(): void {
    const modal = document.querySelector('.news-modal');
    modal?.classList.add('fade-out');

    setTimeout(() => {
      this.selectedNews = null;
      modal?.classList.remove('fade-out');
    }, 300);
  }

  toggleAddNewsForm(): void {
    this.showAddNewsForm = !this.showAddNewsForm;
    if (!this.showAddNewsForm) {
      this.addNewsForm.reset();
    }
  }

  submitNews(): void {
    if (this.addNewsForm.valid) {
      const newNews: News = this.addNewsForm.value;
      this.newsList.unshift(newNews);
      this.toggleAddNewsForm();
    }
  }
}
