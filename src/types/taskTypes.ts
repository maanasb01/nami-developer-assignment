export type Task ={
  id: string;
  title: string;
  from: string;
  to: string;
  assignee?:string;
  taskType: "guest" | "internal";
  reqCategory?: "itemRequest" | "serviceRequest";
  items?: Array<{
    itemName: string;
    quantities: number;
    description?: string;
  }>;
  services?: Array<{
    serviceName: string;
    description?: string;
  }>;
  status: "ongoing" | "completed" | "scheduled";
  isRecurring?: boolean;
  scheduledDate: Date;
  acceptanceStatus?: "accepted" | "notAccepted";
  completionStatus?: "onTime" | "delayed";
  hasComplaint?: boolean;
  rating?: 1 | 2 | 3 | 4 | 5;
}