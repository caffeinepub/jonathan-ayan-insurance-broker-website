import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  type ProductInterest = { #lifeInsurance; #annuities };
  type Gender = { #male; #female; #nonBinary };

  type UserProfile = {
    name : Text;
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
    userProfiles : Map.Map<Principal, UserProfile>;
    submissions : List.List<ContactFormSubmission>;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    persistentSubmissions : List.List<ContactFormSubmission>;
  };

  public func run(old : OldActor) : NewActor {
    { old with persistentSubmissions = old.submissions };
  };
};

