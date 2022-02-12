import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAddressDto } from 'src/auth/dtos/update-address.dto';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.userRepository.findOne(id);
  }

  create(data: Partial<User>) {
    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }

  async populateAddress(user: User) {
    user = await this.userRepository.findOne(user, { relations: ['address'] });

    if (!user.address) user.address = new Address();

    return user;
  }

  async updateAddress(user: User, updateAddressDto: UpdateAddressDto) {
    user = await this.populateAddress(user);

    Object.assign(user.address, updateAddressDto);

    return await this.userRepository.save(user);
  }
}
