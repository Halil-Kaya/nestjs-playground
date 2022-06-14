//google in verdigi bilgiler
export interface IGoogleAuth {
    readonly name: string;
    readonly given_name: string;
    readonly family_name: string;
    readonly picture: string;
    readonly email: string[];
    readonly email_verified: boolean;
    readonly locale:string;
    readonly sub:string;
}