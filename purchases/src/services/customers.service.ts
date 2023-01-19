import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface ICreateCustomerParams {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(
    private prisma: PrismaService
  ){}

  async listAllCustomers() {
    return this.prisma.customer.findMany();
  }

  async getCustomerByAuthUserId(authUserId: string) {
    return await this.prisma.customer.findUnique({where:{authUserId}});
  }

  async createCustomer({ authUserId }: ICreateCustomerParams) {

    return await this.prisma.customer.create({
      data: {authUserId,}
    })
  }
}