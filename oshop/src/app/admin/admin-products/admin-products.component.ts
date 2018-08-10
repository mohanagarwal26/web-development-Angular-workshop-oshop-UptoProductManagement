import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../model/Product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  
  // products$;
  products : Product[];
  filteredProducts : Product[];
  subscribition : Subscription;
  tableResource : DataTableResource<Product>;
  items : Product[] = [];
  itemCount : number = 0;

  constructor(private productService : ProductService) { 
    this.products = new Array(); 
    this.subscribition = productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;

      this.initializeTable(products);
    });
    
    console.log('AdminProductsComponent 7778');
    console.log(this.products)
    console.log(this.subscribition)

    // this.products$ = productService.getAll();
  }

  private initializeTable(products : Product[]){

    this.tableResource = new DataTableResource(products);

    this.tableResource.query({offset : 0})
      .then(items => this.items = items);
      this.tableResource.count()
        .then(count => this.itemCount = count);
  }

  ngOnInit() {
  }

  reloadItems(params){
    if(!this.tableResource) return

    this.tableResource.query(params)
      .then(items => this.items = items);
  }


  ngOnDestroy(): void {
    this.subscribition.unsubscribe();
  }

  filter(query : string){
    console.log(query);
    this.filteredProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;;

    this.initializeTable(this.filteredProducts);
  }

}
