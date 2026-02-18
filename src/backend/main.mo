import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let admins = List.fromArray([Principal.fromText("5xjc2-y22qo-6hyhb-cz5mg-dskju-ngytr-slbw7-lwush-4ucbp-glcln-sqe")]);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Contact form types
  type ProductInterest = {
    #lifeInsurance;
    #annuities;
  };

  type Gender = {
    #male;
    #female;
    #nonBinary;
  };

  public type ContactFormSubmission = {
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

  let submissions = List.empty<ContactFormSubmission>();

  // Don't change needed for this one
  // Public contact form submission - allows guests (no authorization check)
  public shared ({ caller }) func submitContactForm(
    firstName : Text,
    lastName : Text,
    state : Text,
    productInterest : ProductInterest,
    coverageAmount : Nat,
    age : Nat,
    gender : Gender,
    additionalComments : Text,
    bestTimeToContact : Text,
    bestDayToContact : Text,
  ) : async () {
    let newSubmission : ContactFormSubmission = {
      firstName;
      lastName;
      state;
      productInterest;
      coverageAmount;
      age;
      gender;
      additionalComments;
      bestTimeToContact;
      bestDayToContact;
    };
    submissions.add(newSubmission);
  };

  // Admin panel access - requires admin permission
  public query ({ caller }) func getAdminPanel() : async [ContactFormSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access the admin panel");
    };
    submissions.toArray();
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactFormSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all submissions");
    };
    submissions.toArray();
  };
};
