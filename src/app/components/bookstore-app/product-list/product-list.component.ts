import { Component, OnInit } from '@angular/core';
import { Book } from './model/Book';
import { BookService } from './product-list.component.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  livros: Array<Book> = [];
  bookService: BookService;

  constructor(bookService: BookService) {

    this.bookService = bookService

  }

  ngOnInit(): void {

    this.bookService.getBook().subscribe(data => {
      this.livros = this.formataPrecos(data.books.splice(0, 5)); //Só os 5 primeiros livros, para não encher muito a página.
      console.log(this.livros);
    })

  }

  //A API retorna o preço dos livros como uma string com o símbolo do dólar na frente, então tive de criar uma função para remover ele antes de poder utilizar o pipe de currency. Aproveitei para transformar logo o preço em number.
  formataPrecos(lista: Array<Book>) {
    for (let i = 0; i < lista.length; i++) {
      const precoSemSimbolo = lista[i].price.substring(1);
      lista[i].priceInNumber = Number(precoSemSimbolo);
    }
    return lista;
  }

}
