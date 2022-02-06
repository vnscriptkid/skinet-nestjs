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

export function Serialize(
  dto: ClassContructor | Map<ClassContructor, ClassContructor>,
) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(
    private dtoOrMapping:
      | ClassContructor
      | Map<ClassContructor, ClassContructor>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        // TODO: refactor to be more intuitive
        if (this.dtoOrMapping.constructor.name === 'Map') {
          return this.serializeRecursively(data);
        } else {
          return plainToInstance(this.dtoOrMapping as ClassContructor, data, {
            excludeExtraneousValues: true,
          });
        }
      }),
    );
  }

  private serializeRecursively(value: any): any {
    this.dtoOrMapping = this.dtoOrMapping as Map<
      ClassContructor,
      ClassContructor
    >; /* fix type error */

    if (Array.isArray(value)) {
      return value.map((i) => this.serializeRecursively(i));
    }
    if (this.dtoOrMapping.has(value?.constructor)) {
      return plainToInstance(this.dtoOrMapping.get(value.constructor), value, {
        excludeExtraneousValues: true,
      });
    }

    if (value !== null && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([key, value]) => [
          key,
          this.serializeRecursively(value),
        ]),
      );
    }

    return value;
  }
}
