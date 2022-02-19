import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassContructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassContructor | Map<any, any>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  private json: any;

  constructor(private dtoOrMapping: ClassContructor | Map<any, any>) {
    this.json = {};
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        // TODO: refactor to be more intuitive
        // if (this.dtoOrMapping.constructor.name === 'Map') {
        //   this.json = JSON.parse(JSON.stringify(data));
        //   return this.serializeRecursively(data);
        // }

        // example: @Serialize(ProductDto)
        // serialize from data to ProductDto
        return plainToInstance(this.dtoOrMapping as ClassContructor, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }

  private serializeRecursively(value: any): any {
    this.dtoOrMapping = this.dtoOrMapping as Map<any, any>; /* fix type error */

    if (Array.isArray(value)) {
      return value.map((i) => this.serializeRecursively(i));
    }

    // if (this.dtoOrMapping.has(value?.constructor)) {
    //   return plainToInstance(this.dtoOrMapping.get(value.constructor), value, {
    //     excludeExtraneousValues: true,
    //   });
    // }

    // if (value !== null && typeof value === 'object') {
    //   return Object.fromEntries(
    //     Object.entries(value).map(([key, value]) => [
    //       key,
    //       this.serializeRecursively(value),
    //     ]),
    //   );
    // }

    // return value;

    // Case 1: object with existing type
    let obj: any = value;

    if (this.dtoOrMapping.has(value?.constructor)) {
      const destType = this.dtoOrMapping.get(value.constructor);
      obj = plainToInstance(destType, value, { excludeExtraneousValues: true });

      for (let key in obj) {
        if (key in value) {
          obj[key] = this.serializeRecursively(value[key]);
        }
      }
    }
    // Case 2: object with non-existing type
    // Case 3: array with existing type
    // Case 4: array with non-existing type

    // Case 5: primitive value (string, number, boolean)
    return obj;
  }
}

`
  Order {
    name: 'abc',
    type: 'xyz',
    secret: 'xxx',
    orderItems: [
      OrderItem: {
        id: 1,
        date: '2012-02-15',
        price: 123,
        stuff: 'mnp'
      }
    ]
  }

  =>
`;
