import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  url_imagen: string | any;
  file: File | any = null;


  constructor(
    private storage: AngularFireStorage,

  ) { }

  ngOnInit(): void {
  }

  public Marca: any;
  public marcasUnicas: any;

  CrearProducto() {

  }

  async SubirImagenFirestore() {
    if (this.file) {
      const filePath = `images/${this.file.name}`;
      const fileRef = this.storage.ref(filePath);
      try {
        await this.storage.upload(filePath, this.file);
        const downloadUrl = await fileRef.getDownloadURL().toPromise();
        this.url_imagen = downloadUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }

  GuardarImagen(event: any) {
    this.file = event.target.files[0];
    this.MostrarImagen(this.file);
  }

  MostrarImagen(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.url_imagen = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
