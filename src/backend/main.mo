import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";



actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Jonathan Ayan's Principal ID — always has owner/admin access regardless of role system
  private let OWNER_PRINCIPAL : Text = "5xjc2-y22qo-6hyhb-cz5mg-dskju-ngytr-slbw7-lwush-4ucbp-glcln-sqe";

  // Check if caller is the hardcoded owner
  private func isOwner(caller : Principal) : Bool {
    caller.toText() == OWNER_PRINCIPAL
  };

  // TYPES

  public type UserProfile = {
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

  // DATA STRUCTURES - persist across upgrades

  let userProfiles = Map.empty<Principal, UserProfile>();
  let persistentSubmissions = List.empty<ContactFormSubmission>();

  // BACKEND LOGIC

  // Check if caller is the site owner (hardcoded Principal ID)
  public query ({ caller }) func isCallerOwner() : async Bool {
    isOwner(caller)
  };

  // Get current user profile (requires user permission or owner)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (isOwner(caller)) {
      return userProfiles.get(caller);
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  // Get profile of any user (only accessible by profile owner or admin)
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller) and not isOwner(caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Save current user profile (requires user permission or owner)
  public shared ({ caller }) func saveCallerUserProfile(
    profile : UserProfile,
  ) : async () {
    if (not isOwner(caller) and not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public contact form submission - allows guests (no authorization check)
  public shared func submitContactForm(
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
    persistentSubmissions.add(newSubmission);
  };

  // Admin panel access - requires admin permission OR owner
  public query ({ caller }) func getAdminPanel() : async [ContactFormSubmission] {
    if (not isOwner(caller) and not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access the admin panel");
    };
    persistentSubmissions.toArray();
  };

  // Get all submissions (requires admin permission OR owner)
  public query ({ caller }) func getAllSubmissions() : async [ContactFormSubmission] {
    if (not isOwner(caller) and not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all submissions");
    };
    persistentSubmissions.toArray();
  };
};
