import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { BillboardsModule } from './billboards/billboards.module';
import { CategoriesModule } from './categories/categories.module';
import { SizesModule } from './sizes/sizes.module';
import { ColorsModule } from './colors/colors.module';
import { ProductsModule } from './products/products.module';
import { ProductVariantModule } from './product-variant/product-variant.module';
import { CartModule } from './cart/cart.module';

import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';

import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    BillboardsModule,
    CategoriesModule,
    SizesModule,
    ColorsModule,
    ProductsModule,
    ProductVariantModule,
    CartModule,
  ],
  controllers: [AuthController, UsersController],
  providers: [
    PrismaService,
    AuthService,
    UsersService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtGuard },
  ],
})
export class AppModule {}
