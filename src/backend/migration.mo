import Principal "mo:core/Principal";
import Map "mo:core/Map";
import List "mo:core/List";

module {
  type UserProfile = {
    name : Text;
  };

  type ProductInterest = {
    #lifeInsurance;
    #annuities;
  };

  type Gender = {
    #male;
    #female;
    #nonBinary;
  };

  type ContactFormSubmission = {
    firstName : Text;
    lastName : Text;
    state : Text;
    productInterest : ProductInterest;
    coverageAmount : Nat;
    age : Nat;
    gender : Gender;
    additionalComments : Text;
    bestTimeToContact : Text;
    bestDayToContact : Text;
  };

  type OldActor = {
    admins : List.List<Principal>;
    userProfiles : Map.Map<Principal, UserProfile>;
    submissions : List.List<ContactFormSubmission>;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    submissions : List.List<ContactFormSubmission>;
  };

  public func run(old : OldActor) : NewActor {
    {
      userProfiles = old.userProfiles;
      submissions = old.submissions;
    };
  };
};
