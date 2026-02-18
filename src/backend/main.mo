import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import Array "mo:core/Array";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Initialize the access control state with stable variable
  stable let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // TYPES

  public type UserProfile = {
    name : Text;
    // Other user metadata if needed, e.g., email, phone, etc.
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

  // DATA STRUCTURES - marked as stable to persist across upgrades

  stable let userProfiles = Map.empty<Principal, UserProfile>();
  stable let submissions = List.empty<ContactFormSubmission>();

  // BACKEND LOGIC

  // Get current user profile (requires user permission)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  // Get profile of any user (only accessible by profile owner or admin)
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Save current user profile (requires user permission)
  public shared ({ caller }) func saveCallerUserProfile(
    profile : UserProfile,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

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

  // Get all submissions (requires admin permission)
  public query ({ caller }) func getAllSubmissions() : async [ContactFormSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all submissions");
    };
    submissions.toArray();
  };
};
