
export interface ApiCreateUser {
    /**
     * Email
     */
    Email: string;
    /**
     * Name
     */
    Name: string;
}

export interface ApiUser extends ApiCreateUser {
    /**
     * Id of the user
     */
    Id: number;
}
