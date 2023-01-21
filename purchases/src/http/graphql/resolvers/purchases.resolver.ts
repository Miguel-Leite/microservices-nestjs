import {  UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { PurchasesService } from '../../../services/purchases.service';
import { Purchase } from '../models/purchase';
import { Product } from '../models/product';
import { ProductsService } from '../../../services/products.service';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { CurrentUser, IAuthUser } from '../../auth/current-user';
import { CustomersService } from '../../../services/customers.service';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor (
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customersService: CustomersService
    ){}
  
  @Query(()=>[Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField(()=> Product)
  product(
    @Parent() purchase: Purchase
  ) {
    return this.productsService.getProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(@Args("data") data: CreatePurchaseInput, @CurrentUser() user: IAuthUser) {
    let customer = await this.customersService.getCustomerByAuthUserId(user.sub);

    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub,
      })
    }

    return this.purchasesService.createPurchase({
      customerId: customer.id,
      productId: data.productId,
    });
  }
}
