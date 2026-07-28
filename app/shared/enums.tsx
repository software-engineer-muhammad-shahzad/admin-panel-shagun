export enum NotificationPurpose
{    
    SupportTicket = 1,
    ManualNotification = 2,
    PaymentSent = 3,
    GeneralNotification = 4,
}

export enum UserRole {
  SuperAdmin = 1,
  Admin = 2,
  Couple = 3,
}

export enum RecordStatus {
  Active = 1,
  Inactive = 2,
  Deleted = 3,
}

export enum PaymentStatus
{
    Pending = 1,
    Completed = 2,
    Canceled = 3,
    Failed = 4,
    Refunded = 5,
}