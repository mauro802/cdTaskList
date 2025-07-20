export type ButtonProps = {
  type: string;
  htmlType?: "button" | "submit" | "reset";
  label: string;
  onClick?: () => void;
};

export type InputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
};

export type Status = "Done" | "To Do" | "In Progress";

export type Task = {
  id: number;
  name: string;
  status: Status;
  assignee: string;
};

export type TaskItemProps = {
  task: Task;
  onEdit: () => void;
};

export type TaskModalProps = {
  mode: "create" | "edit";
  task?: Task;
  onSave: (task: Task) => void;
  onDelete?: () => void;
  onCancel: () => void;
};

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface CreateTaskPayload {
  name: string;
  status: Status;
  assignee: string;
}

export interface UpdateTaskPayload {
  id: number;
  name?: string;
  status?: Status;
  assignee?: string;
}
