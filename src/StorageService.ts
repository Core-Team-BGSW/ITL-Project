import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
    private storageKey = 'draftFormData';
  
    saveData(data: any): void {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
  
    getData(): any {
      const storedData = localStorage.getItem(this.storageKey);
      return storedData ? JSON.parse(storedData) : null;
    }
  
    clearData(): void {
      localStorage.removeItem(this.storageKey);
    }
  }