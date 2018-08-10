import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;

  constructor(
    private router : Router, 
    private route : ActivatedRoute, 
    private categoryService : CategoryService, 
    private productService : ProductService) { 
      
    this.categories$ = categoryService.getCategories();
    console.log(this.categories$);

    this.id = route.snapshot.paramMap.get('id');
    console.log("id=" + this.id);

    if(this.id && this.id != 'new'){
      productService.get(this.id).take(1).subscribe(p => this.product = p);
      console.log(this.product);
    } else {
      this.product = {};
    }   
  }

  ngOnInit() {
  }

  save(product){
    console.log(product);

    if(this.id ){
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    
    this.router.navigate(['/admin/prodcuts']);
  }

  delete(){
    if(confirm("Are you sure you want ot delete product ?")){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/prodcuts']);
    }    
  }
}
