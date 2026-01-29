import { instanceToPlain } from 'class-transformer';

export abstract class BaseEntity {
    toJSON() {
        return instanceToPlain(this);
    }
}
