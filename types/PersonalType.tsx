export interface Personal {
    __type: string;
    displayCode: string;
    firstName: string;
    imageGuid: string;
    lastName: string;
    preferredName: string;
    reportName: string;
    userId: number;
    adultToChildRelationship: any;
    appGroups: string[];
    authMode: number;
    baseRole: number;
    children: any;
    compassPersonId: string;
    dob: string;
    email: string;
    formGroup: string;
    gender: number;
    genderPronouns: string;
    house: string;
    ii: string;
    isConnectChatRestricted: boolean;
    isCrtOrReservedAccount: boolean;
    medicalAlert: boolean;
    mobileNumber: string;
    passwordReset: boolean;
    phoneNumber: string | null;
    school: {
      __type: string;
      Attributes: any;
      Features: any;
      Fqdn: string;
      ImageUrl: string;
      Name: string;
      SchoolCurrencyCode: string;
      SchoolId: string;
      SchoolLocale: string;
      TimeZone: string;
    };
    userHash: string;
    userRoles: any[];
    username: string;
    yearLevel: number;
};
