import {  UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ResolveField, Parent, ResolveReference } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Customer } from '../models/customer';
import { CustomersService } from '../../../services/customers.service';
import { CurrentUser, IAuthUser } from '../../auth/current-user';
import { PurchasesService } from '../../../services/purchases.service';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor (
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
    ){}

    @Query(()=>Customer)
    @UseGuards(AuthorizationGuard)
  me(
    @CurrentUser() user: IAuthUser
  ) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(
    @Parent() customer: Customer
  ) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }){
    return this.customersService.getCustomerByAuthUserId(reference.authUserId);
  }
}
