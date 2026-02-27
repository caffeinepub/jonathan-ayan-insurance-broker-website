import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactFormSubmission {
    age: bigint;
    bestDayToContact: string;
    additionalComments: string;
    bestTimeToContact: string;
    state: string;
    gender: Gender;
    productInterest: ProductInterest;
    coverageAmount: bigint;
    lastName: string;
    firstName: string;
}
export interface UserProfile {
    name: string;
}
export enum Gender {
    female = "female",
    male = "male",
    nonBinary = "nonBinary"
}
export enum ProductInterest {
    lifeInsurance = "lifeInsurance",
    annuities = "annuities"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAdminPanel(): Promise<Array<ContactFormSubmission>>;
    getAllSubmissions(): Promise<Array<ContactFormSubmission>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(firstName: string, lastName: string, state: string, productInterest: ProductInterest, coverageAmount: bigint, age: bigint, gender: Gender, additionalComments: string, bestTimeToContact: string, bestDayToContact: string): Promise<void>;
}
