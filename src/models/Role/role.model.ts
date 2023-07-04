export interface RoleResponse {
  status: string;
  data: RoleCollection;
}

export interface RoleCollection {
  roles: RoleModel[];
}

export interface RoleModel {
  id: number;
  name: string;
}