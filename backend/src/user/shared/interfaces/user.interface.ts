import { IBaseEntity } from '@/shared/interfaces/base-entity.interface';

/**
 * Represents a user in the system.
 */
export interface IUser extends IBaseEntity {
    /**
     * The universal unique identifier of the user.
     */
    uuid: string;

    /**
     * The user's first name.
     */
    firstName: string;

    /**
     * The user's last name.
     */
    lastName: string;

    /**
     * The user's email address.
     */
    email: string;

    /**
     * The user's password.
     */
    password: string;

    /**
     * Indicates whether the user is active or inactive.
     */
    active: boolean;
}
