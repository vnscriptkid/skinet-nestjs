import { AuthGuardJwt } from 'src/auth/guards/auth-local.guard';
import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuardJwt)
  @Post(':basketId')
  createOrUpdatePaymentIntent(@Param('basketId') basketId: string) {
    return this.paymentService.createOrUpdatePaymentIntent(basketId);
  }
}
