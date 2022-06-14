export interface IFacebookAuth {
    readonly id: string;
    readonly displayName: string;
    readonly name: {
        readonly givenName: string;
        readonly familyName: string;
    };
    readonly emails: [{
        readonly value: string;
    }];
    readonly photos: [{
        readonly value: string;
    }];
}
