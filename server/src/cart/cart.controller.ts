import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { Cart, CartItem, Prisma } from '@prisma/client';

import { CartService } from './cart.service';
import { CreateCartItemDto, UpdateCartItemDto } from 'src/dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  async getCart(@Param('id') userId: string): Promise<Cart> {
    return this.cartService.getCart(userId);
  }

  @Post(':id')
  async addToCart(
    @Param('id') userId: string,
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<Cart | CartItem> {
    return this.cartService.addToCart(userId, createCartItemDto);
  }

  @Patch(':id')
  async updateCartItem(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    return this.cartService.updateCartItem(id, updateCartItemDto);
  }

  @Delete(':id')
  async removeCartItem(@Param('id') id: string): Promise<CartItem> {
    return this.cartService.removeCartItem(id);
  }

  @Delete(':id')
  async clearCart(@Param('id') userId: string): Promise<Prisma.BatchPayload> {
    return this.cartService.clearCart(userId);
  }
}
