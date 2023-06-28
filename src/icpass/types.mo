import Principal "mo:base/Principal";

module {
  public type UserId = Principal;

  public type NewProfile = {
    fullname: Text;
    email_notification: Bool;
    system_notification: Bool;
    show_wallet_number: Bool;
  };

  public type Profile = {
    id: UserId;
    fullname: Text;
    email_notification: Bool;
    system_notification: Bool;
    show_wallet_number: Bool;
  };
};
