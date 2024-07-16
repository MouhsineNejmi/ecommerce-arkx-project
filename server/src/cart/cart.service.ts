import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart, CartItem, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCartItemDto, UpdateCartItemDto } from '../dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string): Promise<Cart> {
    return this.prisma.cart.findFirst({
      where: { user_id: userId },
      include: { cartItems: true },
    });
  }

  async getCartItem(id: string): Promise<CartItem> {
    return await this.prisma.cartItem.findUnique({
      where: { id },
    });
  }

  async addToCart(
    userId: string,
    createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem> {
    const { id, product, size, color, quantity } = createCartItemDto;

    let cart = await this.prisma.cart.findFirst({
      where: { user_id: userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { user_id: userId, total: product.price * quantity },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        id,
        product_id: product.id,
        size_id: size.id,
        color_id: color.id,
        quantity,
        cart_id: cart.id,
      },
    });
  }

  async updateCartItem(id: string, updateCartItemDto: UpdateCartItemDto) {
    const { quantity } = updateCartItemDto;

    const existingCartItem = await this.getCartItem(id);

    if (!existingCartItem) {
      throw new NotFoundException(`Cart Item with id ${id} not found.`);
    }

    return this.prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });
  }

  async removeCartItem(id: string): Promise<CartItem> {
    return this.prisma.cartItem.delete({
      where: { id },
    });
  }

  async clearCart(userId: string): Promise<Prisma.BatchPayload> {
    const cart = await this.prisma.cart.findFirst({
      where: { user_id: userId },
    });

    if (cart) {
      return this.prisma.cartItem.deleteMany({
        where: { cart_id: cart.id },
      });
    }

    return { count: 0 };
  }
}
